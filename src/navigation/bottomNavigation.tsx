import AntDesign from "@expo/vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import { cartStore } from "../store/cartStore";
import { colors } from "../utils/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CategoryScreen from "../screens/CategoryScreen";

const Tabs = createBottomTabNavigator();

const BottomNavigation = () => {
  const productList = cartStore(s => s.productList);
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.secondary,
        tabBarActiveTintColor: colors.background,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveBackgroundColor: colors.text,
        tabBarBadgeStyle: {
          backgroundColor: colors.fill,
          color: "white",
          fontSize: 10,
        },
        // tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <AntDesign name="shoppingcart" size={24} color={color} />;
          },
          tabBarBadge: productList.length,
        }}
      />
    </Tabs.Navigator>
  );
};
export default BottomNavigation;
