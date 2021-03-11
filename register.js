import React from 'react';
import { Text, View, StyleSheet, SectionList, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { AsyncStorage } from 'react-native';

const axios = require('axios')

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            detail: {
                username: '',
                password: '',
            },
            loading: false,
            error: false,
        }
    }
    handleLogin = () => {
        this.setState({ loading: true })
        axios({
            method: 'post',
            url: 'http://10.0.2.2:5484/auth/login',
            data: {
                "username": this.state.detail.username,
                "password": this.state.detail.password,
            }
        })
            .then((response) => {
                this.setState({ loading: false, error: false })
                AsyncStorage.setItem("token", JSON.stringify({username: this.state.detail.username, token: response.data.token}));
                this.props.navigation.navigate('Home')
            }, (error) => {
                this.setState({loading: false, error: true})
                console.log(error);
            });
        // axios.post('http://10.0.2.2:5484/auth/login', JSON.stringify(this.state.detail),
        //     {
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded", 
        //             Accept: "application/json"
        //         },

        //     })
        //     
    }

    onChangeHandler = (e, name) => {
        const value = e.nativeEvent.text;
        const detail = Object.assign({}, this.state.detail)
        detail[name] = value;
        this.setState({ detail });
    }
    render() {
        const { detail, error } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                    source={require('./images/messenger2.png')}
                    style={{ width: '100%', height: 180, flexWrap: 'wrap' }}
                />
                <View style={{ flex: 3, backgroundColor: '#3d3d3d', alignItems: 'center', paddingTop: 30 }}>
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Phone number or email address"
                        style={{ height: 40, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.username}
                        name="username"
                        onChange={(e) => this.onChangeHandler(e, "username")}
                    />
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Password"
                        name="password"
                        style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.password}
                        onChange={(e) => this.onChangeHandler(e, "password")}
                        secureTextEntry={true}
                    />
                    {
                        this.state.loading &&
                        <ActivityIndicator size="small" color="#fff" />
                    }
                    {
                        error &&
                        <Text style={{color: "red"}}>Username or password is incorrect</Text>
                    }
                    <TouchableOpacity
                        onPress={this.handleLogin}
                        style={{
                            backgroundColor: '#1877f2',
                            width: '80%',
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 20
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Log In</Text>
                    </TouchableOpacity>
                    <Text
                        style={{ color: '#1877f2', fontSize: 15, fontWeight: 'bold', marginTop: 15, letterSpacing: 0.5 }}
                        onPress={() => {
                            Linking.openURL('https://aboutreact.com');
                        }}>
                        Forgotten Password?
                    </Text>
                    <View style={{ width: '80%', marginTop: 80 }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <View style={{ width: 147, height: 1, backgroundColor: '#b9b9ba', }} />
                            <Text style={{ color: '#fff' }}>OR</Text>
                            <View style={{ width: 147, height: 1, backgroundColor: '#b9b9ba' }} />
                        </View>
                    </View>
                    <View style={{ width: '80%', marginTop: 80, flexDirection: 'column', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#42b72a',
                                width: '80%',
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 5,
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Create New Facebook Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

};

export default LoginScreen;