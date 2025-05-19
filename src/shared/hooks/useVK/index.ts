import { Alert, Linking } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { Buffer } from 'buffer';
import * as Crypto from 'expo-crypto';
//https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/start-integration/how-auth-works/auth-flow-web#Bez-SDK-s-obmenom-koda-na-bekende

const vkAppId = String(process.env.EXPO_PUBLIC_VK_APP_ID);
// const vkRedirectUri = AuthSession.makeRedirectUri({
//     scheme: 'swans',
//     path: 'continueWithVk',
// });
const vkRedirectUri =
    'https://mmn6wqy-anonymous-8081.exp.direct/continueWithVk';

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

// import { Linking } from 'react-native';

// const vkAppId = String(process.env.EXPO_PUBLIC_VK_APP_ID);
// const vkRedirectUri =
//     'https://mmn6wqy-anonymous-8081.exp.direct/continueWithVk';
// const vkClientSecret = String(process.env.EXPO_PUBLIC_VK_CLIENT_SECRET);

// export const handleVKAuth = async () => {
//     const authUrl = `https://oauth.vk.com/authorize?client_id=${vkAppId}&display=mobile&redirect_uri=${encodeURIComponent(vkRedirectUri)}&scope=profile,email&response_type=code&v=5.131`;
//     Linking.openURL(authUrl);
// };

// export const verifyVKAuth = async (queryParams: Record<string, string>) => {
//     const { code } = queryParams;
//     if (code) {
//         try {
//             const response = await fetch(
//                 `https://oauth.vk.com/access_token?client_id=${vkAppId}&client_secret=${vkClientSecret}&redirect_uri=${encodeURIComponent(vkRedirectUri)}&code=${code}`,
//             );
//             const data = await response.json();
//             console.log('Ответ от ВКонтакте:', data);

//             if (data.error) {
//                 console.error('Ошибка от ВКонтакте:', data.error);
//                 return;
//             }

//             const { user_id, access_token, email } = data;
//             if (user_id && access_token) {
//                 console.log('Получены данные пользователя:', {
//                     user_id,
//                     access_token,
//                     email,
//                 });
//             } else {
//                 console.error('Не удалось получить данные пользователя');
//             }
//         } catch (error) {
//             console.error(
//                 'Ошибка при получении токена доступа ВКонтакте:',
//                 error,
//             );
//         }
//     } else {
//         console.error('Код авторизации не найден');
//     }
// };
