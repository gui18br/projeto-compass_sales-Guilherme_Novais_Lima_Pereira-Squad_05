import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator 
} from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { Button } from '../../components/UI/Button';
import { CustomTextInput } from '../../components/UI/CustomTextInput';
import { useForm, 
    Controller } 
    from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import  * as yup from 'yup'
import { sendPasswordResetEmail } from 'firebase/auth';

const schema = yup.object({
    email: yup.string().email('Not a valid email address. Should be your@email.com').required("Enter your email"),
})

export function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    
    const sendEmail = async (data: any) => {
        setLoading(true);
        try {
            const response = await sendPasswordResetEmail(auth, data.email);
        } catch (error: any) {
            alert('Send email failed' + error.message)
        } finally {
            setLoading(false)
        }
    }
    
  return (
    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <Text style={styles.title}>Forgot password</Text>
        </View>
        <View>
            <Text style={styles.message}>Please, enter your email address. You will receive a link to create a new password via email.</Text>
        </View>
        <View style={styles.containerForm}>
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
            {loading ? <ActivityIndicator size={'large'} color={'#db3022'}/> 
            : <>
                <Button title='SEND' onPress={() => {
                    if(errors.email) {
                        alert('Send email failed' )
                    } else {
                        handleSubmit(sendEmail)();
                    }
                }} />
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
    message: {
        marginBottom: 9,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    errorMessage: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'red'
    },
    containerForm: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    input: {
        height: 65,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 5
    },
    buttonForgot: {
        alignItems: 'flex-end'
    },
    text: {
        color: 'black',
        fontWeight: 'normal'
    }
})