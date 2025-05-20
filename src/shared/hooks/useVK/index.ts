import { Alert, Linking } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { Buffer } from 'buffer';
import * as Crypto from 'expo-crypto';
//https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/start-integration/how-auth-works/auth-flow-web#Bez-SDK-s-obmenom-koda-na-bekende

const vkAppId = String(process.env.EXPO_PUBLIC_VK_APP_ID);
let vkRedirectUri = AuthSession.makeRedirectUri({
    scheme: 'swans',
    path: 'continueWithVk',
});

type PKCE = {
    code_verifier: string;
    code_challenge: string;
    state: string;
    scope: string;
};

export const handleVKAuth = async () => {
    const { code_verifier, code_challenge, state, scope } =
        await generatePKCE();
    const authUrl = buildAuthorizeUrl({ code_challenge, state, scope });

    await Linking.openURL(authUrl);
};

const generatePKCE = async (): Promise<PKCE> => {
    const generateCodeVerifier = (): string => {
        const charset =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
        const length = Math.floor(Math.random() * 85) + 43;
        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            generatedPassword += charset.charAt(
                Math.floor(Math.random() * charset.length),
            );
        }
        return generatedPassword;
    };

    const encryptToS256 = async (code: string): Promise<string> => {
        const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            code,
            { encoding: Crypto.CryptoEncoding.BASE64 },
        );
        const buffer = Buffer.from(hash, 'base64');
        const codeChallenge = buffer
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        return codeChallenge;
    };

    const code_verifier = generateCodeVerifier();
    const code_challenge = await encryptToS256(code_verifier);
    const state = 'state';
    const scope = 'name,email';

    return { code_verifier, code_challenge, state, scope };
};

const buildAuthorizeUrl = (params: {
    code_challenge: string;
    state: string;
    scope: string;
}): string => {
    const { code_challenge, state, scope } = params;
    const base = 'https://id.vk.com/authorize';
    const query = new URLSearchParams({
        response_type: 'code',
        client_id: vkAppId,
        redirect_uri: vkRedirectUri,
        code_challenge,
        code_challenge_method: 'S256',
        state,
        display: 'mobile',
        v: '5.131',
        scope,
    });
    return `${base}?${query.toString()}`;
};
