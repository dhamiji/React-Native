import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, SectionList, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { register } from './action/register.action'
import { AsyncStorage } from 'react-native';

const axios = require('axios')

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            detail: {
                name: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                mobile: '',
                gender: '',
                dob: '',
            },
            loading: false,
            error: false,
            formSubmit: false,
            passwordError: false
        }
    }
    handleRegister = () => {
        const { detail } = this.state;
        this.setState({ formSubmit: true })
        if (!detail.username || detail.name || detail.email || detail.password || detail.confirmPassword || detail.mobile || detail.gender || detail.dob) {
            this.setState({ error: true })
        } else if (detail.password && detail.confirmPassword && detail.password != detail.confirmPassword) {
            this.setState({ passwordError: true })
        } else {
            this.setState({ loading: true })
            const { dispatch } = this.props;
            dispatch(register(detail))
                .then((response) => {
                    this.setState({ loading: false, error: false })
                    this.props.navigation.navigate('LoginScreen')
                }, (error) => {
                    this.setState({ loading: false, signUpError: true })
                    console.log(error);
                });
        }

    }

    onChangeHandler = (e, name) => {
        const value = e.nativeEvent.text;
        const detail = Object.assign({}, this.state.detail)
        detail[name] = value;
        this.setState({ detail, error: false });
    }
    render() {
        const { detail, error, signUpError, formSubmit, passwordError } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                    source={require('../../images/messenger2.png')}
                    style={{ width: '100%', height: 180, flexWrap: 'wrap' }}
                />
                {/* <View style={{backgroundColor: 'black'}}>
                    <Text style={{ position: 'absolute', top: 80, left: 150, fontSize: 25 }}>Create An Account</Text>
                </View> */}
                <View style={{ backgroundColor: '#3d3d3d', alignItems: 'center', paddingTop: 30 }}>
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Full Name"
                        style={{ height: 40, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.name}
                        name="fullName"
                        onChange={(e) => this.onChangeHandler(e, "name")}
                    />
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Email"
                        name="Email"
                        style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.email}
                        onChange={(e) => this.onChangeHandler(e, "email")}
                    />
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Username"
                        name="username"
                        style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.username}
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
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Confirm Password"
                        name="confirmPasswork"
                        style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.confirmPassword}
                        onChange={(e) => this.onChangeHandler(e, "confirmPassword")}
                        secureTextEntry={true}
                    />
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Mobile"
                        name="mobile"
                        style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '80%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.mobile}
                        onChange={(e) => this.onChangeHandler(e, "mobile")}
                    />
                    {
                        this.state.loading &&
                        <ActivityIndicator size="small" color="#fff" />
                    }
                </View>
                <View style={styles.genderDobContainer}>
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Gender"
                        name="gender"
                        style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '30%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.gender}
                        onChange={(e) => this.onChangeHandler(e, "gender")}
                    />
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="DOB"
                        name="dob"
                        style={{ height: 40, marginTop: 10, borderColor: '#b9b9ba', borderWidth: 1, padding: 5, paddingLeft: 3, width: '30%', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 15, fontWeight: '600' }}
                        value={detail.dob}
                        onChange={(e) => this.onChangeHandler(e, "dob")}
                    />

                </View>
                <View style={{ backgroundColor: '#3d3d3d', alignItems: 'center', flex: 3 }}>
                    {
                        this.state.loading &&
                        <ActivityIndicator size="small" color="#fff" />
                    }
                    {
                        formSubmit && !error && !passwordError && signUpError &&
                        <Text style={{ color: "red", marginTop: 6 }}>Something is wrong, please try again!</Text>
                    }
                    {
                        formSubmit && !error && !signUpError && passwordError &&
                        <Text style={{ color: "red", marginTop: 6 }}>Passwords does not match!</Text>
                    }
                    {
                        formSubmit && !signUpError && !passwordError && error &&
                        <Text style={{ color: "red", marginTop: 6 }}>All fields are mandatory!</Text>
                    }
                    <TouchableOpacity
                        onPress={this.handleRegister}
                        style={{
                            backgroundColor: '#1877f2',
                            width: '80%',
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 20
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text
                        style={{ color: '#1877f2', fontSize: 15, fontWeight: 'bold', marginTop: 15, letterSpacing: 0.5 }}
                        onPress={() => {
                            this.props.navigation.push('LoginScreen')
                        }}>
                        Have an account? Log In
                    </Text>
                </View>
            </View>
        )
    }

};
function mapStateToProps(state) {
    const { loginToken } = state.authentication;

    return {
        loginToken,
    }
}

export default connect(mapStateToProps)(Register);
const styles = StyleSheet.create({
    genderDobContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3d3d3d', alignItems: 'center',
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40
    }
})