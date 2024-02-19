/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, Linking } from 'react-native';
import { style } from '../styles/style';

const Reference = () => {

    const handleLinkPress = () => {
        Linking.openURL('https://theghub.org/resources/783/download/Alvarado.pdf');
    };

    return (
        <View>
            <Text style={style.h1}>Referencias bibliográficas</Text>
            <Text style={style.p1}>
                Alvarado, G. (1989). Los volcanes de Costa Rica. San José, Costa Rica, Universidad Estatal a Distancia, 175.
                {' '}
                <Text style={{ color: 'blue' }} onPress={handleLinkPress}>
                    https://theghub.org/resources/783/download/Alvarado.pdf
                </Text>
            </Text>
        </View>
    );
};

export default Reference;
