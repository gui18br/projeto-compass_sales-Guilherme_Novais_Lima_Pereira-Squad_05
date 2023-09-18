import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "../../components/UI/Button";
import { CustomTextInput } from "../../components/UI/CustomTextInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { AuthContext } from "../../contexts/auth";
import { ArrowButton } from "../../components/UI/ArrowButton";

const schema = yup.object({
  email: yup
    .string()
    .email("Not a valid email address. Should be your@email.com")
    .required("Enter your email"),
  password: yup
    .string()
    .min(4, "The password must have at least 4 digits")
    .required("Enter your password"),
});

export function Login() {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();
  const { logUser } = useContext(AuthContext);

  const login = async (data: any) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, data.email, data.password);
      logUser(data.email);
    } catch (error: any) {
      alert("Sign in failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.containerForm}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              label={"Email"}
              autoCapitalize="none"
              onChangeText={onChange}
              keyboardType={"email-address"}
              valueInput={value}
              error={errors.email ? true : false}
            />
          )}
        />
        {errors.email && <Text style={styles.errorMessage}>{errors.email?.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              label={"Password"}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={onChange}
              valueInput={value}
              error={errors.password ? true : false}
            />
          )}
        />
        {errors.password && <Text style={styles.errorMessage}>{errors.password?.message}</Text>}

        {loading ? (
          <ActivityIndicator size={"large"} color={"#db3022"} />
        ) : (
          <>
            <ArrowButton
              title={"Forgot your password?"}
              //@ts-ignore
              onPress={() => navigation.navigate("ForgotPassword")}
            />

            <Button
              title="LOGIN"
              onPress={() => {
                if (errors.email || errors.password) {
                  alert("Sign in failed: Fields not filled in");
                } else {
                  handleSubmit(login)();
                }
              }}
            />
            <Button
              title="SIGN UP"
              // @ts-ignore
              onPress={() => navigation.navigate("SignUp")}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#F0F0F0",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "15%",
    paddingStart: "3%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  containerForm: {
    flex: 1,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  errorMessage: {
    textAlign: "center",
    marginBottom: 8,
    color: "red",
    fontSize: 12,
  },
  text: {
    color: "black",
    fontWeight: "normal",
  },
});
