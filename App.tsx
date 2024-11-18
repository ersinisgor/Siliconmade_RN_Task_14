import { StyleSheet, Text, View } from "react-native";
import MainNavigation from "./src/navigation/mainNavigations";
export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
