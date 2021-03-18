import React from 'react';
import { Text, View, StyleSheet, SectionList, Image } from 'react-native';

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const timeout = setTimeout(() => {
            this.props.navigation.navigate('LoginScreen')
        }, 1000);
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image
                        source={require('../../images/Facebook-logo.png')}
                        style={styles.logo}
                    />
                </View>
                <View
                    style={styles.footerContainer}
                >
                    <Text style={styles.footerText}>FACEBOOK</Text>
                </View>
            </View>
        )
    }

}

export default Splash;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor: 'white',
    },
    logo: {
        height: 75, 
        width: 75,
    },
    footerContainer: {
        position: 'absolute', 
        bottom: 65,
    },
    footerText: {
        fontSize: 20, 
        letterSpacing: 2, 
        fontWeight: 'bold', 
        color: '#9ca3ab'
    }
})