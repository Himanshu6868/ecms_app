import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

const SLA_BY_PRIORITY = {
  Critical: { responseMins: 15, resolutionMins: 240 },
  High: { responseMins: 30, resolutionMins: 480 },
  Medium: { responseMins: 120, resolutionMins: 7200 },
  Low: { responseMins: 240, resolutionMins: 10080 },
} as const;

export const assignCaseIntelligently = functions.https.onCall(async (data: any, context: any) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Auth required');

  const { caseId, category } = data;
  const usersSnap = await db
    .collection('users')
    .where('role', '==', 'CaseAgent')
    .where('skills', 'array-contains', category)
    .orderBy('activeCaseCount', 'asc')
    .limit(1)
    .get();

  if (usersSnap.empty) {
    throw new functions.https.HttpsError('not-found', 'No available agent for category');
  }

  const agent = usersSnap.docs[0];
  await db.collection('cases').doc(caseId).update({
    assignedAgentId: agent.id,
    status: 'Assigned',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { assignedAgentId: agent.id };
});

export const monitorSla = functions.pubsub.schedule('every 5 minutes').onRun(async () => {
  const now = admin.firestore.Timestamp.now();
  const nearBreachSnap = await db
    .collection('cases')
    .where('status', 'in', ['Open', 'Assigned', 'InProgress'])
    .where('responseDueAt', '<=', admin.firestore.Timestamp.fromMillis(now.toMillis() + 10 * 60 * 1000))
    .get();

  const batch = db.batch();

  nearBreachSnap.docs.forEach((doc: any) => {
    const caseData = doc.data();
    const policy = SLA_BY_PRIORITY[caseData.priority as keyof typeof SLA_BY_PRIORITY];
    const escalationThreshold = now.toMillis() + Math.floor(policy.responseMins * 0.8) * 60 * 1000;

    if (caseData.responseDueAt.toMillis() <= escalationThreshold) {
      batch.update(doc.ref, {
        escalated: true,
        status: 'Escalated',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const notifRef = db.collection('notifications').doc();
      batch.set(notifRef, {
        type: 'SLA_WARNING',
        title: `SLA warning for ${doc.id}`,
        body: 'Response SLA is close to breach. Supervisor escalation triggered.',
        userId: caseData.assignedAgentId,
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });

  await batch.commit();
  return null;
});
