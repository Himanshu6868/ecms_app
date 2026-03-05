import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { caseService } from '../../services/case.service';

export const AssignCaseScreen = () => {
  const [caseId, setCaseId] = useState('CASE-1001');
  const [agentId, setAgentId] = useState('agent-02');
  const [result, setResult] = useState('');

  const onAssign = async () => {
    try {
      await caseService.updateCase(caseId, { assignedAgentId: agentId, status: 'Assigned' });
      setResult('Case assigned successfully.');
    } catch {
      setResult('Assignment failed (verify case id and Firebase setup).');
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Assign / Reassign Case</Text>
      <TextInput value={caseId} onChangeText={setCaseId} style={styles.input} placeholder="Case ID" />
      <TextInput value={agentId} onChangeText={setAgentId} style={styles.input} placeholder="Agent ID" />
      <Button title="Assign Case" onPress={onAssign} />
      {result ? <Text>{result}</Text> : null}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#D9DFEA' },
});
