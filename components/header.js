import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

const header = () => {
    return(
        <Image style={styles.header} source={require('../images/header-logo.png')} />
    )
}

const styles = StyleSheet.create({
    header: { width: '40%', height: 50, alignContent: 'flex-start', flex: 1, marginLeft: -15 }
})

export default header;