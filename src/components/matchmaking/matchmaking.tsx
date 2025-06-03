import { Text, View } from 'react-native';
import React from 'react';

const Matchmaking = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text
                style={{
                    fontSize: 32,
                    textAlign: 'center',
                }}
            >
                Это заглушка. Нужно будет поменять на страницу{' '}
                <Text style={{ fontWeight: 'bold' }}>Dating</Text>
            </Text>
        </View>
    );
};

export default Matchmaking;
