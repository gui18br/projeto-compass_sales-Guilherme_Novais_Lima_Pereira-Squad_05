import React, { useContext } from 'react';
import { View, 
    Text, 
    ImageBackground, 
    StyleSheet } 
    from 'react-native';
import { Button } from '../../components/UI/Button';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

import { AuthContext } from '../../contexts/auth'

export function Home() {
    const { name } = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <ImageBackground
            source={require('../../assets/compassLogo.png')}
            style={styles.backGround}
        >
            <Text style={styles.greetings}>Hello, {name}</Text>
            <View style={styles.initial}>
                <Text style={styles.initialTitle}>Compass sale</Text>
                <View style={styles.initialButton} ><Button title='Check' /></View>
            </View>
        </ImageBackground>
        <View style={styles.catalog}>
            <Text style={styles.title}>New</Text>
            <Button title='Logout' onPress={() => FIREBASE_AUTH.signOut()}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backGround: {
       flex: 4,
       justifyContent: 'flex-start',
       height: '100%'
    },
    catalog: {
        flex: 1
    },
    greetings: {
        marginStart: '5%',
        marginTop: 20,
        fontWeight: '400',
        fontSize: 20,
        color: '#fff',
    },
    initial: {
        position: 'absolute',
        right: 70,
        bottom: 40,
        marginHorizontal: 80,
    },
    initialTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff'
    },
    initialButton: { 
        marginEnd: 60
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})