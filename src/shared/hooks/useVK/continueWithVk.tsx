import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import type { EventType } from 'expo-linking';
import * as Linking from 'expo-linking';
import * as VKID from '@vkid/sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessfulAuth from '../successfulAuth/successfulAuth';
//https://vkcom.github.io/vkid-web-sdk/docs/classes/auth.Auth.html#exchangeCode.exchangeCode-1

WebBrowser.maybeCompleteAuthSession();

export default async function ContinueWithVk() {
    const { code, deviceId } = useLocalSearchParams();

    useEffect(() => {
        if (!code) return;
        else {
            const handleUrl = (event: EventType) => {
                const url = event.url;
                const params = getQueryParams(url);
                registerUser(code as string, deviceId as string);
            };

            const subscription = Linking.addEventListener('url', handleUrl);
            return () => {
                subscription.remove();
            };
        }
    }, [code, deviceId]);

    return null;
}
function getQueryParams(url: string): Record<string, string> {
    const params: Record<string, string> = {};
    try {
        const parsed = new URL(url);
        parsed.searchParams.forEach((value, key) => {
            params[key] = value;
        });
    } catch (e) {
        console.warn('Failed to parse URL', e);
    }
    return params;
}
async function registerUser(code: string, deviceId: string) {
    const codeVerifier = await AsyncStorage.getItem('code_verifier');
    if (codeVerifier) {
        const tokenResult = await VKID.Auth.exchangeCode(
            code as string,
            deviceId as string,
            codeVerifier,
        );
        if (tokenResult && tokenResult['user_id']) {
            await AsyncStorage.removeItem('code_verifier');
            const userId = String(tokenResult['user_id']);
            SuccessfulAuth(userId, 'vk');
        }
    } else {
        console.error('codeVerifier missing');
        throw new Error('CODE_VERIFIER MISSING');
    }
}
