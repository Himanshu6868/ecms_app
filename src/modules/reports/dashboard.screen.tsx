import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { mockDashboard } from '../../api/mock-data';

const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

export const DashboardScreen = () => (
  <ScreenContainer>
    <Text style={styles.title}>Operations Dashboard</Text>
    <View style={styles.grid}>
      <MetricCard label="Total Cases" value={mockDashboard.totalCases} />
      <MetricCard label="Open Cases" value={mockDashboard.openCases} />
      <MetricCard label="Resolved Cases" value={mockDashboard.resolvedCases} />
      <MetricCard label="SLA Compliance" value={`${mockDashboard.slaCompliance}%`} />
    </View>
    <Text style={styles.subtitle}>Agent Workload</Text>
    {mockDashboard.agentWorkload.map((agent) => (
      <View key={agent.agentId} style={styles.row}>
        <Text>{agent.agentId}</Text>
        <Text>{agent.activeCases} active</Text>
      </View>
    ))}
  </ScreenContainer>
);

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 10, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metricCard: { width: '48%', backgroundColor: '#fff', borderRadius: 10, padding: 12 },
  metricValue: { fontSize: 20, fontWeight: '700' },
  metricLabel: { color: '#5C6B80' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
});
