import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { firebase } from '../Firebase/firebase';
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignUp = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayFormErr, setDisplayFormErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = () => {
        navigation.navigate('SignIn')
    }

    //form validateion 
    const validatForm = () => {
        let form_inputs = [fullName, email, mobile, password, confirmPassword];
        let password_match = password == confirmPassword;

        if (form_inputs.includes('') || form_inputs.includes(undefined)) {
            setDisplayFormErr(true); setErrorMessage("Please fill in all fields!");
            return;
        }

        if (!password_match) {
            setDisplayFormErr(true); setErrorMessage("Password does not match!");
            return;
        }

        if (password_match) {
            createUser();
            return;
        }
    }

    const formEmpty =() => {
        setFullName('')
        setMobile('')
        setPassword('')
        setEmail('')
        setConfirmPassword('')

    }

    const createUser = () => {
        // alert('data successfully sent in firebase.')
        setIsLoading(true);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {

                setIsLoading(false)
                setSuccessMessage('Your account has been created succsfully.')
                formEmpty();
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMessage(err.message);
                setDisplayFormErr(true);
                console.log(err.message)
                //setSuccessMessage('Your account has been created succsfully.')
            })
    }

    return (
        <>
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <Image style={styles.ImageStyle} source={require('../assets/images/m2.png')} />
                <Text style={styles.logoText}>Tech Aliens</Text>
            </View>
            {/* bottom view start here........ */}
            <ScrollView style={styles.bottomView}>
                <TouchableOpacity onPress={navigate}>
                    <FeatherIcon style={styles.Icon} name="chevron-left" size={60} color={"#fff"} />
                </TouchableOpacity>
                <Text style={styles.Heading}>Create Account</Text>
                <View style={styles.FormView}>
                    <TextInput
                        value={fullName}
                        onChangeText={(value) => setFullName(value)}
                        placeholder={'Full Name*'}
                        placeholderTextColor='#fff'
                        style={styles.TextInput} />
                    <TextInput
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder={'Email Address*'}
                        placeholderTextColor='#fff'
                        keyboardType="email-address"
                        style={styles.TextInput} />
                    <TextInput
                        value={mobile}
                        onChangeText={(value) => setMobile(value)}
                        placeholder={'Mobile Number*'}
                        placeholderTextColor='#fff'
                        keyboardType="number-pad"
                        style={styles.TextInput} />
                    <TextInput
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        placeholder={'Password*'}
                        placeholderTextColor='#fff'
                        secureTextEntry={true}
                        style={styles.TextInput} />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        placeholder={'Confirm Password*'}
                        placeholderTextColor='#fff'
                        secureTextEntry={true}
                        style={styles.TextInput} />

                    <TouchableOpacity style={styles.Button} onPress={validatForm}>
                        <Text style={styles.ButtonText}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.TextButton} >
                    <Text style={styles.signUpText}>Are you already registered?
                        <TouchableOpacity  onPress={navigate}>
                            <Text style={{ color: 'green', }}> Sign In</Text>
                        </TouchableOpacity>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            {displayFormErr == true ? <FormError errorMessage={errorMessage} hideErrOverlay={setDisplayFormErr} /> : null}
            {isLoading == true ?
                <FormSuccess />
                :
                successMessage == "Your account has been created succsfully." ?
                    <FormSuccess successMessage={successMessage} hideSuccessOverlay={setSuccessMessage} />
                :
                null
            }
        </View>
        </>
    )
}

export default SignUp

const styles = StyleSheet.create({
    mainView: {
        marginTop: 25,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        width: '100%',
        height: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        width: '100%',
        height: '75%',
        backgroundColor: '#000',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    ImageStyle: {
        width: '20%',
        resizeMode: 'contain',
        marginBottom: -60
    },
    logoText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4B4B4E',
        marginTop: 0,
        marginBottom: 70,
    },
    Heading: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 5,
    },
    FormView: {
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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
        paddingTop: -10,

    },
    TextButton: {
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 20,
    },
    Icon: {
        marginLeft: 5,
        marginTop: 5,
    }

})
