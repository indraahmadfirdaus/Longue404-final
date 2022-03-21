import { useState, useEffect } from "react";
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
  useToast,
} from "native-base";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login } from "./api/auth";
import { getLoggedUser } from "./api/user";
import socket from "./services/socket";
import { v4 as uuidv4 } from "uuid";

function LoginPage({ navigation }) {
  const [inputState, setInputState] = useState({ email: "", password: "" });
  const toast = useToast();

  const handleLogin = async () => {
    let body = {};
    body["email"] = inputState.email;
    body["password"] = inputState.password;
    console.log(body);

    let response = await login(body);

    if (response.status === "success") {
      navigation.navigate("ChatPage", {
        access_token: response.data.access_token,
      });
      toast.show({
        description: response.message,
      });
    } else {
      console.log("login", response);
    }
  };

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
                onChangeText={(text) =>
                  setInputState({ ...inputState, email: text })
                }
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
                onChangeText={(text) =>
                  setInputState({ ...inputState, password: text })
                }
              />
            </Stack>
            <Button rounded={100} onPress={handleLogin}>
              Login
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Box>
  );
}

function ChatPage({ route, navigation }) {
  const { access_token } = route.params;
  const [loggedUser, setLoggedUser] = useState({});
  const [chats, setChats] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const fetchLoggedUser = async () => {
    let response = await getLoggedUser(access_token);

    if (response.status === "success") {
      setLoggedUser(response.data);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    socket.on("send chat", (payload) => {
      if (payload.sender) {
        setChats([...chats, senderChat(payload)]);
      } else {
        setChats([...chats, recieverChat(payload)]);
      }
    });
  }, [chats]);

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  const handleSendMessage = () => {
    if (chatMessage) {
      socket.emit("send chat", {
        id: loggedUser._id,
        avatar: loggedUser.avatar,
        username: loggedUser.username,
        message: chatMessage,
      });
      setChatMessage("");
    }
  };

  const logout = () => {
    navigation.navigate("Login");
  };

  const recieverChat = (el) => {
    return (
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
            {el.username}
          </Avatar>
          <Text fontSize={"xs"} marginLeft={"2"}>
            {el.username}
          </Text>
        </HStack>
        <Text fontSize={"lg"}>{el.message}</Text>
      </Box>
    );
  };

  const senderChat = (el) => {
    return (
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
            {el.username}
          </Text>

          <Avatar bg="gray.100" size="xs">
            {el.username}
          </Avatar>
        </HStack>
        <Text color="white" fontSize="lg">
          {el.message}
        </Text>
      </Box>
    );
  };

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
            {loggedUser.username}
          </Avatar>
          <Button
            marginLeft={"auto"}
            colorScheme="red"
            variant={"ghost"}
            onPress={logout}
          >
            Keluar
          </Button>
        </HStack>
        <ScrollView height={height * 0.6} position="relative">
          {[...chats]}
        </ScrollView>
        <Input
          onSubmitEditing={handleSendMessage}
          onChangeText={(text) => setChatMessage(text)}
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
