import React from "react";
import { Text } from 'tamagui'
import { View } from "react-native";


export default function Dashboard() {
    return (
        <View>
            <Text ta="right" fontSize="$2" cursor='pointer' color="$gray10" mb="$3" onPress={() => console.log('Lupa password')}>
                Mobile
            </Text>
        </View>
    );
}