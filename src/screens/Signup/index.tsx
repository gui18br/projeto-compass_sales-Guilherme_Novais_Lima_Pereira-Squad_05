import React, {useContext, useState} from 'react';
import { ActivityIndicator, 
    TouchableOpacity, 
    View, 
    StyleSheet, 
    Text 
} from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { Button } from '../../components/UI/Button';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CustomTextInput } from '../../components/UI/CustomTextInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import  * as yup from 'yup'
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { AuthContext } from '../../contexts/auth';

const schema = yup.object({
    name: yup.string().required("Enter your name"),
    email: yup.string().email('Not a valid email address. Should be your@email.com').required("Enter your email"),
    password: yup.string().min(4, 'The password must have at least 4 digits').required("Enter your password") 
})

export function Signup() {
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const navigation = useNavigation();
    const { createUser } = useContext(AuthContext)

    const signUp = async (data: any) => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
            createUser(data.name, data.email)
        } catch (error: any) {
            alert('Sign up failed' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
        <View style={styles.containerHeader}>
            <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.containerForm}>
            <Controller 
                control={control}
                name='name'
                render={({ field: {onChange, value} }) => (
                <CustomTextInput 
                    label={'Name'} 
                    onChangeText={onChange}
                    valueInput={value}
                    error={errors.name ? true : false}
                />
                )}
            />
            {errors.name && <Text style={styles.errorMessage}>{errors.name?.message}</Text>}
            <Controller 
                control={control}
                name='email'
                render={({ field: {onChange, value} }) => (
                <CustomTextInput 
                    label={'Email'}
                    autoCapitalize='none'
                    onChangeText={onChange}
                    keyboardType={'email-address'}
                    valueInput={value}
                    error={errors.email ? true : false}
                />
                )}
            />
            {errors.email && <Text style={styles.errorMessage}>{errors.email?.message}</Text>}
            <Controller 
                control={control}
                name='password'
                render={({ field: {onChange, value} }) => (
                <CustomTextInput 
                    label={'Password'}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={onChange}
                    valueInput={value}   
                    error={errors.password ? true : false}                 
                />
                )}
            />
            {errors.password && <Text style={styles.errorMessage}>{errors.password?.message}</Text>}
            
            {loading ? <ActivityIndicator size={'large'} color={'#db3022'}/> 
            : <>
                <TouchableOpacity style={styles.buttonForgot} onPress={() => navigation.navigate('Login')}>
                    <Text >Already have an account? <AntDesign 
                        name='arrowright'
                        size={15}
                        color='red'
                        /></Text>
                </TouchableOpacity>

                <Button title='SIGN UP' 
                    onPress={() => {
                        if(errors.email || errors.name || errors.password) {
                            alert('Sign up failed: Fields not filled in' )
                            navigation.navigate('Login')
                        } else {
                            handleSubmit(signUp)();
                        }
                    }} 
                />
            </>
            }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#F0F0F0'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '15%',
        paddingStart: '3%'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    containerForm: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    errorMessage: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'red',
    },
    buttonForgot: {
        alignItems: 'flex-end'
    },
    text: {
        color: 'black',
        fontWeight: 'normal'
    }
})