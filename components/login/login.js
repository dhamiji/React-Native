import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, SectionList, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { login } from './action/login.action'
import {setItem} from '../../helpers/asyncStorage'

const axios = require('axios')

export class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            detail: {
                username: '',
                password: '',
            },
            loading: false,
            error: false,
            loginError: false,
            formSubmit: false,
        }

    }

    componentDidMount(){
        this.setState({detail: {username: '', password: '',}})
    }
    handleLogin = () => {
        this.setState({ formSubmit: true })
        const { detail } = this.state;
        const { dispatch } = this.props;
        if (!detail.username ||  !detail.password) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
            this.setState({ loading: true })
            dispatch(login(detail))
                .then((response) => {
                    if (response.error) {
                        this.setState({ loading: false, loginError: true, formSubmit: false })
                    } else {
                        this.setState({ loading: false, error: false })
                        tokenObj = { 
                            username: this.state.detail.username, 
                            token: response.token 
                        }
                        setItem("token", tokenObj);
                        this.props.navigation.navigate('Home')
                        this.setState({ formSubmit: false })
                    }
                    
                }, (error) => {
                    this.setState({ loading: false, loginError: true })
                    console.log(error);
                });
        }   
    }

    onChangeHandler = (e, name) => {
        const value = e.nativeEvent.text;
        const detail = Object.assign({}, this.state.detail)
        detail[name] = value;
        this.setState({ detail, loginError: false, formSubmit: false });
    }
    render() {
        const { detail, error, formSubmit, loginError } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../images/messenger2.png')}
                    style={styles.loginBanner}
                />
                <View style={styles.loginForm}>
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Phone number or email address"
                        style={styles.inputFields}
                        value={detail.username}
                        name="username"
                        onChange={(e) => this.onChangeHandler(e, "username")}
                    />
                    <Text style={styles.helperText}>{formSubmit && error && !detail.username ? 'Username is required.' : ''}</Text>
                    <TextInput
                        placeholderTextColor="#b9b9ba"
                        placeholder="Password"
                        name="password"
                        style={[styles.inputFields, styles.margingTop10]}
                        value={detail.password}
                        onChange={(e) => this.onChangeHandler(e, "password")}
                        secureTextEntry={true}
                    />
                    <Text style={styles.helperText}>{formSubmit && error && !detail.password ? 'Password is required.' : ''}</Text>
                    {
                        this.state.loading &&
                        <ActivityIndicator size="small" color="#fff" />
                    }
                    {
                        loginError &&
                        <Text style={{ color: "red" }}>Username or password is incorrect</Text>
                    }
                    <TouchableOpacity
                        onPress={this.handleLogin}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.forgotPassword}
                        onPress={() => {
                            Linking.openURL('https://aboutreact.com');
                        }}>
                        Forgotten Password?
                    </Text>
                    <View style={styles.OrOptionsContainer}>
                        <View style={styles.orLine}>
                            <View style={styles.lines} />
                            <Text style={styles.orText}>OR</Text>
                            <View style={styles.lines} />
                        </View>
                    </View>
                    <View style={styles.createAccountContainer}>
                        <TouchableOpacity
                            style={styles.createAccountButton}
                            onPress={() => navigation.push('Register')}
                        >
                            <Text style={styles.createAccountText}>Create New Facebook Account</Text>
                        </TouchableOpacity>
                    </View>
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

export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    loginBanner: {
        width: '100%',
        height: 180,
        flexWrap: 'wrap'
    },
    loginForm: {
        flex: 3,
        backgroundColor: '#3d3d3d',
        alignItems: 'center',
        paddingTop: 30
    },
    inputFields: {
        height: 40,
        borderColor: '#b9b9ba',
        borderWidth: 1,
        padding: 5,
        paddingLeft: 3,
        width: '80%',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        fontSize: 15,
        fontWeight: '600'
    },
    margingTop10: {
        marginTop: 10
    },
    loginButton: {
        backgroundColor: '#1877f2',
        width: '80%',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    loginText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: '#1877f2',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15,
        letterSpacing: 0.5
    },
    OrOptionsContainer: {
        width: '80%',
        marginTop: 80
    },
    orLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lines: {
        width: 147, height: 1, backgroundColor: '#b9b9ba',
    },
    orText: {
        color: '#fff'
    },
    createAccountContainer: {
        width: '80%',
        marginTop: 80,
        flexDirection: 'column',
        alignItems: 'center'
    },
    createAccountButton: {
        backgroundColor: '#42b72a',
        width: '80%',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    createAccountText: { color: "#fff", fontSize: 15, fontWeight: 'bold', },
    helperText: {
        color: 'red'
    }
})