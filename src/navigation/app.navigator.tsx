import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../modules/auth/login.screen';
import { DashboardScreen } from '../modules/reports/dashboard.screen';
import { CaseListScreen } from '../modules/cases/case-list.screen';
import { CaseDetailsScreen } from '../modules/cases/case-details.screen';
import { CreateCaseScreen } from '../modules/cases/create-case.screen';
import { AssignCaseScreen } from '../modules/cases/assign-case.screen';
import { useAuthStore } from '../store/auth.store';

const Tabs = createBottomTabNavigator();

export const AppNavigator = () => {
  const firebaseUser = useAuthStore((state) => state.firebaseUser);

  return (
    <NavigationContainer>
      {!firebaseUser ? (
        <LoginScreen />
      ) : (
        <Tabs.Navigator>
          <Tabs.Screen name="Dashboard" component={DashboardScreen} />
          <Tabs.Screen name="CaseList" component={CaseListScreen} options={{ title: 'Cases' }} />
          <Tabs.Screen name="CaseDetails" component={CaseDetailsScreen} options={{ title: 'Case Details' }} initialParams={{ caseId: 'CASE-1001' }} />
          <Tabs.Screen name="CreateCase" component={CreateCaseScreen} />
          <Tabs.Screen name="AssignCase" component={AssignCaseScreen} />
        </Tabs.Navigator>
      )}
    </NavigationContainer>
  );
};
