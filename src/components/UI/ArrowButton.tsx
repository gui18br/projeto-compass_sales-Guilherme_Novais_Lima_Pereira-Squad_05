import AntDesign from "@expo/vector-icons/build/AntDesign";
import React from "react";
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function ArrowButton({ style, title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.arrowButton, style]} onPress={onPress}>
      <Text>
        {title} <AntDesign name="arrowright" size={15} color="red" />
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arrowButton: {
    alignItems: "flex-end",
  },
});
