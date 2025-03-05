import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { tokenCache } from '@/cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
    throw new Error(
        'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
}
export default function RootLayout() {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ClerkLoaded>
                <SafeAreaProvider>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: "black"
                        }}
                    >
                        <Stack
                            screenOptions={{
                                headerTitleAlign: "center",
                                headerShown: false
                            }}
                        />
                    </SafeAreaView>
                </SafeAreaProvider>
            </ClerkLoaded>
        </ClerkProvider>
    )
}
