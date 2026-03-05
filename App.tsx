import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuthSession } from './src/hooks/use-auth-session';
import { AppNavigator } from './src/navigation/app.navigator';

const Bootstrap = () => {
  useAuthSession();
  return <AppNavigator />;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Bootstrap />
    </GestureHandlerRootView>
  );
}
