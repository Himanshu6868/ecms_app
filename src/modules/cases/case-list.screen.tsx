import { Pressable, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { mockCases } from '../../api/mock-data';

export const CaseListScreen = ({ navigation }: { navigation: any }) => (
  <ScreenContainer>
    <Text style={styles.title}>Case Queue</Text>
    {mockCases.map((item) => (
      <Pressable
        key={item.caseId}
        style={styles.card}
        onPress={() => navigation.navigate('CaseDetails', { caseId: item.caseId })}
      >
        <Text style={styles.cardTitle}>{item.caseId} · {item.title}</Text>
        <Text>{item.category} / {item.priority} / {item.status}</Text>
      </Pressable>
    ))}
  </ScreenContainer>
);

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 12, gap: 6 },
  cardTitle: { fontWeight: '600' },
});
