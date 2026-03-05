import type { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export const ScreenContainer = ({ children }: PropsWithChildren) => (
  <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F7FB' },
  content: { padding: 16, gap: 12 },
});
