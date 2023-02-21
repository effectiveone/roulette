import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Roulette from "./components/roulette";
import { BetContextProvider } from "./utils/context/useBetContext";

export default function App() {
  return (
    <BetContextProvider>
      <View style={styles.container}>
        <Roulette />
      </View>
    </BetContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
