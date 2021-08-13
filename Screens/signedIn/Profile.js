import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { firebase } from '../../Firebase/firebase'

const Profile = ({navigation, route}) => {


    const signOut = () => {
        firebase.auth().signOut();
    }



    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.Button} onPress={signOut}>
                <Text style={styles.ButtonText}> Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    mainView: {
        marginTop: 25,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color:'#fff'
    },
})
