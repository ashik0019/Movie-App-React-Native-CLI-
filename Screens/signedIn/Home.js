import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const Home = () => {
    const [searchInput, setsearchInput] = useState('')
    const [feed, setFeed] = useState([])

    //fetch feeds
    useEffect(() => {
        fetch('https://aurora-django-app.herokuapp.com/feed?feed_count=0')
            .then((re) => re.json())
            .then((re) => {
                setFeed(re.response)
            })
    }, [])
    
    //details action
    const detailsHandler = () => {
        alert('coming soon details screen. ')
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.Heading}>Colors Show</Text>
            <View style={styles.TextInputView}>
                <TextInput
                    value={setsearchInput}
                    onChangeText={(value) => setsearchInput(value)}
                    placeholder={'Enter song title or artist name'}
                    placeholderTextColor='#000'
                    keyboardType="email-address"
                    style={styles.TextInput} />
            </View>
            <View style={styles.mainPostView}>
                {feed.length < 1 ?
                    <ActivityIndicator size={"large"} color={"#2FBB0F0"} />
                    :
                    <FlatList
                        data={feed}
                        keyExtractor={(item, index) => { return item.post_id.toFixed() }}
                        renderItem={({ item, index }) => (
                            <View style={styles.postView}>
                                <View style={styles.postTitle}>
                                    <View style={styles.ImageView}>
                                        <Image style={styles.artistPhoto} source={{ uri: item.artist_photo }} />
                                        <View style={styles.title_View}>
                                            <Text style={styles.artist_Name}>{item.post_artist}</Text>
                                            <Text style={styles.post_Title}>{item.post_title}</Text>
                                        </View>

                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={detailsHandler}>
                                        <SimpleLineIcons name="options-vertical" size={15} />
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>

                                <Image style={styles.coverPhoto} source={{ uri: item.cover_poto }} />
                                
                            </View>
                        )}
                    />
                }
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    title_View: {
        marginLeft: 15,
    },
    artist_Name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    post_Title: {
        fontSize: 11,
        color: '#989898'

    },
    mainView: {
        flex: 1,

    },
    Heading: {
        fontSize: 30,
        marginTop: 15,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    TextInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#ddd',
        height: 39,
        borderRadius: 20,
        paddingLeft: 15,
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#EBEBEB'
    },
    TextInputView: {
        display: 'flex',
        alignItems: 'center'
    },
    mainPostView: {
        width: '100%',
        marginBottom: 150
    },
    postTitle: {
        width: "90%",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'

    },
    postView: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    artistPhoto: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    ImageView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    coverPhoto: {
        width:'90%',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
    }


})
