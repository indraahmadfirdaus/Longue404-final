import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import { Image, NativeBaseProvider, Text, Box, Button } from "native-base";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Poppins: require("./assets/Poppins-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <NativeBaseProvider>
      <Box
        style={styles.container}
        flex={1}
        bg="#fff"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          resizeMode="cover"
          source={require("./assets/img-splash.png")}
          alt="splash"
          style={styles.splash}
        />
        <Text
          fontSize={35}
          style={{
            position: "absolute",
            fontFamily: "Poppins",
            zIndex: 25,
            bottom: 200,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Hi, Indra !
        </Text>
        <Text
          style={{
            position: "absolute",
            zIndex: 25,
            fontFamily: "Poppins",
            bottom: 170,
            textAlign: "center",
            fontSize: 15,
            marginTop: 20,
            color: "gray",
          }}
        >
          Manage task harian kamu.
        </Text>
        <Button
          borderRadius={100}
          variant="subtle"
          width={width * 0.5}
          height={height * 0.05}
          bottom={110}
          fontFamily="Poppins"
          style={{ zIndex: 100, position: "absolute" }}
        >
          Selanjutnya
        </Button>
        <Box style={styles.topLeft}></Box>
      </Box>
    </NativeBaseProvider>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins",
    position: "relative",
  },
  splash: {
    position: "absolute",
    top: 160,
    left: "auto",
    zIndex: 20,
    height: height * 0.5,
    width: width * 0.7,
  },
  topLeft: {
    backgroundColor: "#99FEFF",
    zIndex: 5,
    position: "absolute",
    top: 0,
    width: width,
    height: height * 0.55,
    borderBottomEndRadius: 75,
    borderBottomStartRadius: 75,
  },
});
