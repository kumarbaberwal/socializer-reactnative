import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

export default function Index() {
    const { signOut } = useAuth();
    return (
        <View>
            <Text>Index</Text>
            <TouchableOpacity onPress={() => signOut()}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}