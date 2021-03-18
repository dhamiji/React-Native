import React, { Component, useState } from 'react';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { Button, Image, View, Platform, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import defaultAvatar from '../../images/profile.png';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

// const createFormData = (photo, body) => {
//     const data = new FormData();

//     data.append('photo', {
//         name: photo.fileName,
//         type: photo.type,
//         uri:
//             Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
//     });

//     Object.keys(body).forEach((key) => {
//         data.append(key, body[key]);
//     });

//     return data;
// };

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            userDetails: {
                name: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                mobile: '',
                gender: '',
                dob: '',
            }
        }
    }
    onChangeHandler = (e, name) => {
        const value = e.nativeEvent.text;
        const userDetails = Object.assign({}, this.state.userDetails)
        userDetails[name] = value;
        this.setState({ userDetails });
    }
    
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
        
        
    };
    render() {
        const { register } = this.props;
        const { userDetails, image } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
                <View style={styles.imageContainer}>
                    {
                        image != null ?
                            <Image style={styles.image} source={{ uri: image }} />
                            : <Image style={styles.image} source={require('../../images/avatar.png')} />
                    }
                    <TouchableOpacity
                        onPress={this.pickImage}
                        style={{ alignItems: 'center', width: 50, height: 50, position: 'absolute', borderRadius: 50, bottom: 0, right: 0, backgroundColor: 'black' }}
                    >
                        <Image style={{ width: 30, height: 30, position: 'absolute', bottom: 10, right:7 }} source={require('../../images/upload-image.png')} />
                    </TouchableOpacity>
                    {/* <View >
                        <Image style={{ width: 50, height: 50, position: 'absolute', bottom: 0, right: 0 }} source={require('../../images/upload-image.png')} />
                    </View> */}

                </View>
                <View style={{ width: '80%', justifyContent: 'space-around', flexDirection: 'column' }}>
                    <View>
                        <TextInput
                            placeholderTextColor="#b9b9ba"
                            placeholder="Full Name"
                            style={{ height: 40, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                            value={userDetails.name}
                            name="fullName"
                            onChange={(e) => this.onChangeHandler(e, "name")}
                        />
                        <TextInput
                            placeholderTextColor="#b9b9ba"
                            placeholder="Email"
                            name="Email"
                            style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                            value={userDetails.email}
                            onChange={(e) => this.onChangeHandler(e, "email")}
                        />
                        <TextInput
                            placeholderTextColor="#b9b9ba"
                            placeholder="Username"
                            name="username"
                            style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                            value={userDetails.username}
                            onChange={(e) => this.onChangeHandler(e, "username")}
                        />
                        <TextInput
                            placeholderTextColor="#b9b9ba"
                            placeholder="Mobile"
                            name="mobile"
                            style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                            value={userDetails.mobile}
                            onChange={(e) => this.onChangeHandler(e, "mobile")}
                        />
                        {
                            this.state.loading &&
                            <ActivityIndicator size="small" color="#fff" />
                        }
                    </View>
                    <View>
                        <TextInput
                            placeholderTextColor="#b9b9ba"
                            placeholder="Gender"
                            name="gender"
                            style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '30%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                            value={userDetails.gender}
                            onChange={(e) => this.onChangeHandler(e, "gender")}
                        />
                        <TextInput
                            placeholderTextColor="#b9b9ba"
                            placeholder="DOB"
                            name="dob"
                            style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '30%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                            value={userDetails.dob}
                            onChange={(e) => this.onChangeHandler(e, "dob")}
                        />

                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#1877f2',
                            width: '100%',
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 20,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', }}>SAVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.push('LoginScreen')}
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 5,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: "#2d88ff", fontSize: 15, fontWeight: 'bold', }}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        height: 150,
        width: 150,
        borderRadius: 150,
        backgroundColor: 'black'
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 150,
    }
})

function mapStateToProps(state) {
    const { loginToken } = state.authentication;
    const { register } = state.user;
    return {
        loginToken,
        register
    }
}
export default connect(mapStateToProps)(Settings);