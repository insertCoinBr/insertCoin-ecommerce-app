import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importações
import HomeAdm from '../pages/admin/HomeAdm';
import AddEmployee from '../pages/admin/AddEmployee';
import RemoveEmployee from '../pages/admin/RemoveEmployee';
import EditEmployee from '../pages/admin/EditEmployee';
import EditEmployeeForm from '../pages/admin/EditEmployeeForm';
import Order from '../pages/admin/Order';
import OrderDetails from '../pages/admin/OrderDetails';
//import ClientsMenu from '../pages/admin/ClientsMenu';
import AddClient from '../pages/admin/AddClient';
import RemoveClient from '../pages/admin/RemoveClient';
import ViewEditClient from '../pages/admin/ViewEditClient';
import EditClientForm from '../pages/admin/EditClientForm';
import ClientOrders from '../pages/admin/ClientOrders';
import ClientOrderDetails from '../pages/admin/ClientOrderDetails';
//import ProductsMenu from '../pages/admin/ProductsMenu';
import AddProduct from '../pages/admin/AddProduct';
import RemoveProduct from '../pages/admin/RemoveProduct';
import ViewEditProduct from '../pages/admin/ViewEditProduct';
import EditProductForm from '../pages/admin/EditProductForm';

const Stack = createNativeStackNavigator();

export default function AdmStack({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeAdm">
        {(props) => <HomeAdm {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="RemoveEmployee" component={RemoveEmployee} />
      <Stack.Screen name="EditEmployee" component={EditEmployee} />
      <Stack.Screen name="EditEmployeeForm" component={EditEmployeeForm} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />

      {/*<Stack.Screen name="ClientsMenu" component={ClientsMenu} /> */}

      <Stack.Screen name="AddClient" component={AddClient} />
      <Stack.Screen name="RemoveClient" component={RemoveClient} />
      <Stack.Screen name="ViewEditClient" component={ViewEditClient} />
      <Stack.Screen name="EditClientForm" component={EditClientForm} />
      <Stack.Screen name="ClientOrders" component={ClientOrders} />
      <Stack.Screen name="ClientOrderDetails" component={ClientOrderDetails} />
      
      {/* <Stack.Screen name="ProductsMenu" component={ProductsMenu} /> */}
      
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="RemoveProduct" component={RemoveProduct} />
      <Stack.Screen name="ViewEditProduct" component={ViewEditProduct} />
      <Stack.Screen name="EditProductForm" component={EditProductForm} />
    </Stack.Navigator>
  );
}