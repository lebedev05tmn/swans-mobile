import * as SecureStore from 'expo-secure-store';

export default function checkIfUserExistsLocally(): boolean {
    const user = SecureStore.getItem('user');
    if (user) {
        const userJSON: {
            user_id: string;
            access_token: string;
            refresh_token: string;
        } = JSON.parse(user);
        console.log(userJSON);
        return Boolean(userJSON['access_token'] && userJSON['refresh_token']);
    } else {
        return false;
    }
}
