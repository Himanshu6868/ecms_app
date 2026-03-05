import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { caseService } from '../../services/case.service';

export const CreateCaseScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const onCreate = async () => {
    try {
      await caseService.createCase({
        title,
        description,
        category: 'TechnicalSupport',
        subcategory: 'ApplicationError',
        severity: 'Medium',
        priority: 'Medium',
        attachments: [],
        createdBy: 'demo-user',
      });
      setMessage('Case created successfully.');
    } catch {
      setMessage('Case creation failed (check Firebase configuration).');
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Create Case</Text>
      <TextInput placeholder="Case title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Description"
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Submit Case" onPress={onCreate} />
      {message ? <Text>{message}</Text> : null}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#D9DFEA' },
  multiline: { minHeight: 120, textAlignVertical: 'top' },
});
