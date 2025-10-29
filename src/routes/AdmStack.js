import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importações
import HomeAdm from '../pages/admin/HomeAdm';
import EmployeesMenu from '../pages/admin/EmployeesMenu';
import AddEmployee from '../pages/admin/AddEmployee';
import RemoveEmployee from '../pages/admin/RemoveEmployee';
import EditEmployee from '../pages/admin/EditEmployee';
import EditEmployeeForm from '../pages/admin/EditEmployeeForm';

const Stack = createNativeStackNavigator();

export default function AdmStack({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeAdm">
        {(props) => <HomeAdm {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="EmployeesMenu" component={EmployeesMenu} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="RemoveEmployee" component={RemoveEmployee} />
      <Stack.Screen name="EditEmployee" component={EditEmployee} />
      <Stack.Screen name="EditEmployeeForm" component={EditEmployeeForm} />
    </Stack.Navigator>
  );
}