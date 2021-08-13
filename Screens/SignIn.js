import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
import { firebase } from '../Firebase/firebase';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayFormErr, setDisplayFormErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = () => {
        navigation.navigate('SignUp')
    }

    const validateInput = () => {
        let form_inputs = [email, password];

        if (form_inputs.includes('') || form_inputs.includes(undefined)) {
            setDisplayFormErr(true); setErrorMessage("Please fill in all fields!");
            return;
        }
        setIsLoading(true)
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false);
            setErrorMessage(err.message);
            setDisplayFormErr(true);
            console.log(err.message)
        })

    }

    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <Image style={styles.ImageStyle} source={require('../assets/images/m2.png')} />
                <Text style={styles.logoText}>Tech Aliens</Text>
            </View>
            {/* bottom view start here........ */}
            <View style={styles.bottomView}>
                <Text style={styles.Heading}>Welcome{'\n'} Back</Text>
                <View style={styles.FormView}>
                    <TextInput
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder={'Email Address*'}
                        placeholderTextColor='#fff'
                        keyboardType="email-address"
                        style={styles.TextInput} />
                    <TextInput
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        placeholder={'Password*'}
                        placeholderTextColor='#fff'
                        secureTextEntry={true}
                        style={styles.TextInput} />

                    <TouchableOpacity style={styles.Button} onPress={validateInput}>
                        <Text style={styles.ButtonText}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                    <Text style={styles.signUpText}>
                        You don't have any account ?
                        <View style={{ marginTop: 50 }}>
                            <TouchableOpacity onPress={navigate}>
                                <Text style={{ color: 'green', }} > Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </Text>
                </TouchableOpacity>
            </View>
            {displayFormErr == true ? <FormError errorMessage={errorMessage} hideErrOverlay={setDisplayFormErr} /> : null}
            {isLoading == true ?
                <FormSuccess /> : null
            }
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    mainView: {
        marginTop: 40,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        width: '100%',
        height: '70%',
        backgroundColor: '#000',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    ImageStyle: {
        width: '25%',
        resizeMode: 'contain',
        marginBottom: -45
    },
    logoText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4B4B4E',
        marginTop: 0,
        marginBottom: 30,
    },
    Heading: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 60,
    },
    FormView: {
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    TextInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        height: 52,
        borderRadius: 10,
        paddingLeft: 10,
        color: '#fff',
        marginTop: 20
    },
    Button: {
        width: '90%',
        height: 52,
        color: '#fff',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    signUpText: {
        color: "gray",

    },
    TextButton: {
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 20,
    }


})
