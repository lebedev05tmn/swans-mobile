import { Alert } from 'react-native';

export function response500() {
    Alert.alert('Сервис временно недоступен, повторите попытку позже');
    console.error('500\nServer not responding');
    throw new Error('SERVER_UNAVAILABLE');
}

export function response400(serverAnswer: object) {
    console.error(`400\nInvalid request, server response:\n${serverAnswer}`);
    throw new Error('INVALID_REQUEST');
}
