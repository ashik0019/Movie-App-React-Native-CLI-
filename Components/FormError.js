import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Button, Overlay } from 'react-native-elements';

const FormError = ({ hideErrOverlay, errorMessage }) => {
    return (
        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => hideErrOverlay(false)}>
            <Image style={styles.errorIcon} source={require('../assets/images/error.png')} />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity style={styles.Button} onPress={() => hideErrOverlay(false)}>
                <Text style={styles.buttonText}>Okey</Text>
            </TouchableOpacity>
        </Overlay>
    )
}

export default FormError

const styles = StyleSheet.create({
    Overlay: {
        width: '90%',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorIcon: {
        width: 72,
        height: 72
    },
    errorMessage: {
        color: '#000',
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    Button: {
        width: '90%',
        height: 52,
        color: '#fff',
        backgroundColor: '#000',
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color:'#fff',
        //fontWeight:'bold',
        fontSize: 20
    },
})

