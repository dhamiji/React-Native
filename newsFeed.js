import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { data } from './data'
import Chetan from './images/Chetan.jpg'
import Yogi from './images/Yogi.jpg'
import { AsyncStorage } from 'react-native';

const axios = require('axios');
export class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: ""
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token')
            .then((res) => {
                const tokenData = JSON.parse(res)
                const token = tokenData.token;
                const username = tokenData.username;
                axios({
                    method: 'get',
                    url: `http://10.0.2.2:5484/user/${username}`,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                },

                )
                    .then((response) => {
                        this.setState({ userDetails: response.data })

                    }, (error) => {
                        alert(error);
                        console.log(error);
                    });
            })

    }
    render() {
        const { userDetails } = this.state;
        return (
            <ScrollView contentContainerStyle={{ backgroundColor: "#fff" }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {
                    this.state.userDetails != "" &&
                    <View style={{ backgroundColor: '#bebebe', }}>
                        <View style={{ width: '100%', flex: 1, borderBottomWidth: 0.5, borderBottomColor: '#a4a4a4', flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', paddingTop: 0, paddingBottom: 0, paddingLeft: 8, paddingRight: 8, justifyContent: 'space-between', minHeight: 90 }}>
                            {
                                userDetails.name == "Chetan" &&
                                <Image source={require('./images/Chetan.jpg')} style={{ width: 45, height: 45, borderRadius: 50 }} />
                            }
                            {
                                userDetails.name == "Vaibhav" || userDetails.name == "Veera" &&
                                <Image source={require('./images/Yogi.jpg')} style={{ width: 45, height: 45, borderRadius: 50 }} />
                            }
                            <TextInput
                                placeholderTextColor="#000"
                                placeholder="Write something here..."
                                style={{ height: 40, borderColor: '#a4a4a4', borderWidth: 1, padding: 5, paddingLeft: 15, width: '85%', fontSize: 17, fontWeight: '600', borderRadius: 50, backgroundColor: '#fff', height: 60 }}

                            />
                        </View>
                        <View style={{ width: '100%', flex: 1, flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', paddingTop: 5, paddingBottom: 8, paddingLeft: 8, paddingRight: 8, justifyContent: 'space-between', minHeight: 40 }}>
                            <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 1, borderRightColor: '#a4a4a4', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./images/live.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Live</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 1, borderRightColor: '#a4a4a4', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./images/photos.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Photo</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./images/short_video.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Short Video</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flex: 1, flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', paddingTop: 5, paddingBottom: 5, paddingLeft: 8, paddingRight: 8, justifyContent: 'space-between', minHeight: 70, marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1.5, borderColor: 'skyblue', borderRadius: 50, paddingBottom: 8, paddingTop: 8, paddingLeft: 10, maxWidth: 90, maxHeight: 40 }} >
                                <Image source={require('./images/create_room.png')} style={{ width: 22, height: 20, marginRight: 8 }} />
                                <Text style={{ color: '#3788f2', flexShrink: 1, fontSize: 12, fontWeight: 'bold' }}>Create room</Text>
                            </View>
                            <View >
                                <Image source={require('./images/watch_party_ref.jpg')} style={{ width: 40, height: 40, marginRight: 8, borderRadius: 50 }} />
                            </View>
                            <View >
                                <Image source={require('./images/watch_party_ref.jpg')} style={{ width: 40, height: 40, marginRight: 8, borderRadius: 50 }} />
                            </View>
                            <View >
                                <Image source={require('./images/watch_party_ref.jpg')} style={{ width: 40, height: 40, marginRight: 8, borderRadius: 50 }} />
                            </View>
                            <View >
                                <Image source={require('./images/watch_party_ref.jpg')} style={{ width: 40, height: 40, marginRight: 8, borderRadius: 50 }} />
                            </View>
                            <View >
                                <Image source={require('./images/watch_party_ref.jpg')} style={{ width: 40, height: 40, marginRight: 8, borderRadius: 50 }} />
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', marginTop: 10, marginBottom: 10 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between', flexGrow: 1 }} style={{ flex: 1, backgroundColor: '#fff', paddingLeft: 8, paddingRight: 8, minHeight: 180, }}>
                                <View style={{ flex: 1, flexDirection: 'column', minHeight: 150, backgroundColor: '#f4f4f4', borderRadius: 10, marginRight: 10, flexWrap: 'wrap', width: 90, }}>
                                    <Image source={require('./images/profile-pic.jpg')} style={{ height: 90, width: 90, borderRadius: 10 }} />
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ color: '#000', alignSelf: 'center', fontSize: 12, position: 'relative', bottom: -30, fontWeight: 'bold' }}>Create a Story</Text>
                                        <Image source={require('./images/create_story.png')} style={{ width: 30, height: 30, position: 'absolute', left: 35, top: -15 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', marginRight: 10, minHeight: 150, backgroundColor: '#f4f4f4', marginRight: 15, borderRadius: 10, flexWrap: 'wrap', width: 90 }}>
                                    <Image source={require('./images/profile-pic.jpg')} style={{ height: 150, width: 98, borderRadius: 10 }} />
                                    <Image source={require('./images/profile-pic.jpg')} style={{ height: 30, width: 30, borderRadius: 50, position: 'absolute', top: 5.5, left: 5.5 }} />
                                    <Image source={require('./images/active_story.png')} style={{ height: 42, width: 42, borderRadius: 50, position: 'absolute' }} />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', marginRight: 10, minHeight: 150, backgroundColor: '#f4f4f4', marginRight: 15, borderRadius: 10, flexWrap: 'wrap', width: 90 }}>
                                    <Image source={require('./images/tony.jpg')} style={{ height: 150, width: 98, borderRadius: 10 }} />
                                    <Image source={require('./images/proPic3.jpeg')} style={{ height: 30, width: 30, borderRadius: 50, position: 'absolute', top: 5.5, left: 5.5 }} />
                                    <Image source={require('./images/inactive_story.png')} style={{ height: 42, width: 42, borderRadius: 50, position: 'absolute' }} />

                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', marginRight: 10, minHeight: 150, backgroundColor: '#f4f4f4', marginRight: 15, borderRadius: 10, flexWrap: 'wrap', width: 90 }}>
                                    <Image source={require('./images/squirell.jpg')} style={{ height: 150, width: 98, borderRadius: 10 }} />
                                    <Image source={require('./images/proPic2.jpg')} style={{ height: 30, width: 30, borderRadius: 50, position: 'absolute', top: 5.5, left: 5.5 }} />
                                    <Image source={require('./images/inactive_story.png')} style={{ height: 42, width: 42, borderRadius: 50, position: 'absolute' }} />

                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', marginRight: 10, minHeight: 150, backgroundColor: '#f4f4f4', marginRight: 15, borderRadius: 10, flexWrap: 'wrap', width: 90 }}>
                                    <Image source={require('./images/profile-pic.jpg')} style={{ height: 150, width: 98, borderRadius: 10 }} />
                                    <Image source={require('./images/proPic2.jpg')} style={{ height: 30, width: 30, borderRadius: 50, position: 'absolute', top: 5.5, left: 5.5 }} />
                                    <Image source={require('./images/inactive_story.png')} style={{ height: 42, width: 42, borderRadius: 50, position: 'absolute' }} />
                                </View>

                            </ScrollView>
                            <View style={{ width: '100%', flex: 1, alignItems: 'center', paddingLeft: 8, paddingRight: 8, }}>
                                <TouchableOpacity
                                    style={{
                                        alignItems: "center",
                                        backgroundColor: "#e7f3ff",
                                        padding: 10,
                                        width: 390,
                                        borderRadius: 10
                                    }}
                                // onPress={onPress}
                                >
                                    <Text style={{ color: '#0f90f3', fontWeight: 'bold', fontSize: 16 }}>Show All Stories</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            data.map(x, index => {
                                return (
                                    <View key={index} style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', paddingBottom: 10, paddingTop: 10, paddingLeft: 10, marginBottom: 10 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                                            <Image source={x.image} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 15 }} />
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                <Text style={{ fontWeight: 'bold' }}>{x.name}</Text>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                                    <Text>{x.time}</Text>
                                                    <Image source={require('./images/dot.png')} style={{ height: 5, width: 5, marginLeft: 5 }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 20 }}>{x.content}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                }
            </ScrollView>
        )

    }

}

export default NewsFeed;