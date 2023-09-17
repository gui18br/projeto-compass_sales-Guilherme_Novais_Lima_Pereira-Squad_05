import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, 
    TextInput, 
    Text, 
    StyleSheet 
} from 'react-native'

export function CustomTextInput({style ,label, valueInput, autoCapitalize, secureTextEntry, onChangeText, keyboardType, error }: any) {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
            setIsFocused(true)
    }

    const handleBlur = () => {
        if (text === "") {
            setIsFocused(false)
        }
    }

    return (
        <View style={[styles.container, style]}>
             <Text
                style={[
                    styles.label,
                    {
                        top: isFocused || text !== '' ? 5 : 20,
                        fontSize: isFocused || text !== '' ? 12 : 15,
                        color: isFocused ? 'gray' : 'gray'
                    }
                ]}
            >
                {label}
            </Text>
            <View>
            {onChangeText && (
                error ? (
                    <AntDesign 
                        name='close'
                        size={20}
                        color='red'
                        style={styles.icon}
                        />
                    ) : valueInput && (
                        <AntDesign 
                        name='check'
                        size={20}
                        color='green'
                        style={styles.icon}
                        />
                    )
                    )}
            </View>
            <TextInput 
                style={[styles.input, error && styles.errorInput]}
                value={valueInput}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onChangeText={(newText) => {
                    setText(newText);
                    onChangeText(newText)
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 64,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    label: {
        position: 'absolute',
        left: 10,
    },
    input: {
        paddingLeft: 10,
        height: 64,
        marginBottom: 12,
        borderRadius: 5,
    },  
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
        marginHorizontal: 0
    },
    icon: {
        position: 'absolute',
        right: 0,
        marginVertical: 20,
        marginHorizontal: 10
    },

})