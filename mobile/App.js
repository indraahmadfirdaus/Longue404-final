import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import {
  Image,
  NativeBaseProvider,
  Text,
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Avatar,
  HStack,
  ScrollView,
} from "native-base";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LoginPage({ navigation }) {
  return (
    <Box
      style={styles.container}
      flex={1}
      bg="#fff"
      alignItems="center"
      justifyContent="center"
    >
      <Box padding={5} rounded={10} background="white">
        <FormControl>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                width={250}
                variant="underlined"
                p={2}
                placeholder="Email"
              />
            </Stack>
            <Stack>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                width={250}
                variant="underlined"
                p={2}
                placeholder="Password"
              />
            </Stack>
            <Button
              rounded={100}
              onPress={() => navigation.navigate("ChatPage")}
            >
              Login
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Box>
  );
}

function ChatPage({ navigation }) {
  return (
    <Box
      style={styles.container}
      flex={1}
      bg="#fff"
      alignItems="center"
      justifyContent="center"
      padding={20}
    >
      <Box padding={5} rounded={10} background="white" width={325}>
        <HStack alignItems={"center"} marginBottom="2">
          <Avatar bg="gray.100" size="xs">
            Aj
          </Avatar>
          <Button marginLeft={"auto"} colorScheme="red" variant={"ghost"}>
            Keluar
          </Button>
        </HStack>
        <ScrollView height={height * 0.6} position="relative">
          <Box
            padding={3}
            rounded={10}
            borderWidth={1}
            borderColor={"muted.400"}
            width="250"
            marginBottom="4"
          >
            <HStack alignItems={"center"} marginBottom="2">
              <Avatar bg="gray.100" size="xs">
                Aj
              </Avatar>
              <Text fontSize={"xs"} marginLeft={"2"}>
                test chattt here
              </Text>
            </HStack>
            <Text fontSize={"lg"}>test chattt here</Text>
          </Box>
          {[0, 0, 0, 0].map((el) => (
            <Box
              padding={3}
              rounded={10}
              background="cyan.400"
              width="250"
              marginBottom="4"
              marginLeft={8}
            >
              <HStack alignItems={"center"} marginBottom="2">
                <Text
                  color="white"
                  fontSize={"xs"}
                  marginLeft={"auto"}
                  marginRight="2"
                >
                  test chattt here
                </Text>

                <Avatar bg="gray.100" size="xs">
                  Aj
                </Avatar>
              </HStack>
              <Text color="white" fontSize="lg">
                test chattt here
              </Text>
            </Box>
          ))}
        </ScrollView>
        <Input
          type="text"
          width={"100%"}
          p={2}
          placeholder="Tulis Chat disini"
        />
      </Box>
    </Box>
  );
}

const StackNav = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Poppins: require("./assets/Poppins-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNav.Navigator>
          <StackNav.Screen name="Login" component={LoginPage} />
          <StackNav.Screen name="ChatPage" component={ChatPage} />
        </StackNav.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99FEFF",
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
