import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,
   TouchableOpacity 
  } from 'react-native';

export function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name='chevron-left' size={24} color='black' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    backButton: {
        right: 12,
    }
})