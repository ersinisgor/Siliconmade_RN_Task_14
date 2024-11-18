import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./bottomNavigation";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { colors } from "../utils/constants";
import ProductScreen from "../screens/ProductScreen";
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList } from "./type";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={BottomNavigation}
          options={{ headerShown: false, animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: "Home",
            headerTintColor: colors.background,
            headerStyle: { backgroundColor: "#2c2e43" },
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ route }) => ({
            title: `Category: ${route.params?.categoryName}`,
            headerTintColor: colors.primary,
            headerStyle: { backgroundColor: colors.container },
            animation: "fade_from_bottom",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
