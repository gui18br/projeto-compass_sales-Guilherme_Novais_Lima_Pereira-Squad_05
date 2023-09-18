import React from "react";
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, style, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#db3022",
    width: "100%",
    padding: 10,
    borderRadius: 30,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#db3022",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
