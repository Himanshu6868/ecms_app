import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { authService } from '../../services/auth.service';

export const LoginScreen = () => {
  const [email, setEmail] = useState('case.manager@ecms.com');
  const [password, setPassword] = useState('ChangeMe123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onEmailLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.loginWithEmail(email, password);
    } catch {
      setError('Invalid credentials or Firebase not configured yet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Enterprise Case Management</Text>
      <Text style={styles.subtitle}>Securely sign in to manage operational cases.</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={loading ? 'Signing in...' : 'Sign in with Email'} onPress={onEmailLogin} disabled={loading} />
      <Button title="Sign in with Google (configure OAuth)" onPress={() => {}} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginTop: 20 },
  subtitle: { color: '#5C6B80', marginBottom: 12 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#D9DFEA' },
  error: { color: '#B00020' },
});
