import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AdminContainer from "../../components/admin/AdminContainer";
import MenuItem from "../../components/admin/MenuItem";

export default function HomeAdm({ route }) {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const menuItems = [
    { title: "Employees", route: "Employees" },
    { title: "Carts", route: "Carts" },
    { title: "Clients", route: "Clients" },
    { title: "Orders", route: "Orders" },
    { title: "Products", route: "Products" },
    { title: "Promotions", route: "Promotions" },
    { title: "Notifications", route: "Notifications" },
  ];

  const filteredItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <AdminContainer
      showSearch
      searchValue={searchText}
      onSearchChange={setSearchText}
      searchPlaceholder="Type to search"
      onToggleView={() => navigation.navigate("ClientView")} // ajuste conforme sua navegação
      isAdminView={true}
    >
      {filteredItems.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          onPress={() => navigation.navigate(item.route)}
        />
      ))}
    </AdminContainer>
  );
}