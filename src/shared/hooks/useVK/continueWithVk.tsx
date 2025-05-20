import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import type { EventType } from 'expo-linking';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function ContinueWithVk() {
    const { code, state } = useLocalSearchParams();
    useEffect(() => {
        if (!code) return;
        else {
            const handleUrl = (event: EventType) => {
                const url = event.url;
                const params = getQueryParams(url);
                console.log('VK redirect params:', params);

                // handle VK `code`, `state`, etc.
            };

            const subscription = Linking.addEventListener('url', handleUrl);
            return () => {
                subscription.remove();
            };
        }
    }, [code, state]);

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
