import React from 'react';
import { Text, View, StyleSheet, SectionList, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
})
class SectionListBasics extends React.Component {
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
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <View>
                    <Image
                        source={require('./images/Facebook-logo.png')}
                        style={{ height: 75, width: 75, }}
                    />
                </View>
                <View
                    style={{position: 'absolute', bottom: 65,}}
                >
                    <Text style={{fontSize: 20, letterSpacing: 2, fontWeight: 'bold', color: '#9ca3ab'}}>FACEBOOK</Text>
                </View>
            </View>
        )
    }

}

export default SectionListBasics;