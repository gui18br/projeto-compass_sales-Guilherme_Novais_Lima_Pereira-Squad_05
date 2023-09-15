import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Login } from '../screens/Login';
import { Signup } from '../screens/Signup';
import { ForgotPassword } from '../screens/ForgotPassword';
import { BackButton } from '../components/UI/BackButton';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Home } from '../screens/Home';

const Stack = createNativeStackNavigator();

export function Routes() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        })
    })

    return (
        <Stack.Navigator>
        {user ? (
            <>
                <Stack.Screen 
                    name='Home'
                    component={Home}
                    options={{ headerShown: false}}
                />
            </>
        ) : (
            <>
                <Stack.Screen 
                    name='Login'
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='SignUp'
                    component={Signup}
                    options={{
                        headerTitle: '',
                        headerTransparent: true,
                        headerLeft: () => (<BackButton />)
                    }}
                />
                <Stack.Screen 
                    name='ForgotPassword'
                    component={ForgotPassword}
                    options={{
                        headerTitle: '',
                        headerTransparent: true,
                        headerLeft: () => (<BackButton />)
                    }}
                />
            </>
        )}
    </Stack.Navigator>
  );
}