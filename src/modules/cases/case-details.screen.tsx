import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { mockCases } from '../../api/mock-data';

export const CaseDetailsScreen = ({ route }: { route: any }) => {
  const selectedCase = mockCases.find((item) => item.caseId === route.params.caseId);

  if (!selectedCase) {
    return (
      <ScreenContainer>
        <Text>Case not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>{selectedCase.caseId}</Text>
      <Text style={styles.subtitle}>{selectedCase.title}</Text>
      <View style={styles.block}>
        <Text>Status: {selectedCase.status}</Text>
        <Text>Priority: {selectedCase.priority}</Text>
        <Text>Category: {selectedCase.category} / {selectedCase.subcategory}</Text>
        <Text>Assigned Agent: {selectedCase.assignedAgentId}</Text>
      </View>
      <Text>{selectedCase.description}</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 17, fontWeight: '600' },
  block: { backgroundColor: '#fff', borderRadius: 8, padding: 12, gap: 6 },
});
