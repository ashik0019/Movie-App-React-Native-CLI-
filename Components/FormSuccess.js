import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Button, Overlay } from 'react-native-elements';

const FormSuccess = ({ hideSuccessOverlay, successMessage }) => {
    return (
        successMessage ?
            (<Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => hideSuccessOverlay(false)}>
                <Image style={styles.errorIcon} source={require('../assets/images/check.png')} />
                <Text style={styles.errorMessage}>{successMessage}</Text>
                <TouchableOpacity style={styles.Button} onPress={() => hideSuccessOverlay(false)}>
                    <Text style={styles.buttonText}>Okey</Text>
                </TouchableOpacity>
            </Overlay>) :
           ( <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => hideSuccessOverlay(false)}>
                <ActivityIndicator size={"large"} color={"#2FBB0F0"} />
            </Overlay>)
    )
}

export default FormSuccess

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
        color: '#fff',
        //fontWeight:'bold',
        fontSize: 20
    },
})