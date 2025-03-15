import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
    useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync('#000000');
            NavigationBar.setButtonStyleAsync('light');
        }
    }, [])
    return (
        <ClerkAndConvexProvider>
            <SafeAreaProvider>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: "black"
                    }}
                >
                    <InitialLayout />
                </SafeAreaView>
            </SafeAreaProvider>
            <StatusBar style={'light'} />
        </ClerkAndConvexProvider>
    )
}
