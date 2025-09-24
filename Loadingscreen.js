import { Image, View } from "react-native";

export default function Loadingscreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C8E6C9",
      }}
    >
      <Image
        source={require("./assets/wastewise.png")}
        style={{ height: 320, width: 320, transform: [{ translateY: -70 }] }}
      />
    </View>
  );
}
