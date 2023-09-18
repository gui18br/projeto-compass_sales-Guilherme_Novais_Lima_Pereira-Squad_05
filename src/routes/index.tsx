import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";
import { ForgotPassword } from "../screens/ForgotPassword";
import { BackButton } from "../components/UI/BackButton";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Home } from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const InsideTab = createBottomTabNavigator();

function InsideLayout() {
  return (
    <InsideTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InsideTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ focused, size }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={"red"} />;
            }
            return <Ionicons name="home-outline" size={size} />;
          },
        }}
      />
    </InsideTab.Navigator>
  );
}

export function Routes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
        statusBarColor: "#F0F0F0",
        statusBarStyle: "dark",
      }}
    >
      {user ? (
        <>
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{
              headerShown: false,
              statusBarColor: "#000000",
              statusBarStyle: "light",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerTitle: "",
              headerTransparent: true,
              headerLeft: () => <BackButton />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
