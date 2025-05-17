import * as SecureStore from 'expo-secure-store';

export default function checkIfUserExistsLocally(): boolean {
    // SecureStore.deleteItemAsync('user'); //Для теста
    let user = SecureStore.getItem('user');
    if (user) {
        const userJSON: {
            user_id: string;
            access_token: string;
            refresh_token: string;
        } = JSON.parse(user);
        console.log(userJSON);
        return Boolean(
            userJSON['user_id'] &&
                userJSON['access_token'] &&
                userJSON['refresh_token'],
        );
    } else {
        return false;
    }
}
