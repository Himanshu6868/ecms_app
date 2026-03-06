import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ensureFirebaseConfigured, storage } from '../firebase/config';

const fetchBlob = async (uri: string) => {
  const response = await fetch(uri);
  return response.blob();
};

export const documentService = {
  async pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
    });
    return result.canceled ? null : result.assets[0];
  },

  async pickDocument() {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    });

    return result.canceled ? null : result.assets[0];
  },

  async uploadCaseFile(caseId: string, fileUri: string, fileName: string) {
    ensureFirebaseConfigured();
    const blob = await fetchBlob(fileUri);
    const fileRef = ref(storage!, `cases/${caseId}/${Date.now()}-${fileName}`);
    await uploadBytes(fileRef, blob);
    return getDownloadURL(fileRef);
  },
};
