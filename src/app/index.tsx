import { Redirect } from 'expo-router';
import Loading from '../screens/Loading';
import useMetaData from '../shared/hooks/useMetaData';
import { useEffect } from 'react';
import checkIfUserExistsLocally from '../shared/hooks/checkIfUserExists/checkIfUserExistsLocally';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
    const { metaData, isLoading } = useMetaData();

    useEffect(() => {
        const deleteUser = async () => {
            await SecureStore.deleteItemAsync('user');
        };
        deleteUser();
    }, [metaData]);

    return isLoading ? (
        <Loading />
    ) : checkIfUserExistsLocally() ? (
        <Redirect href="/matchmaking" />
    ) : (
        <Redirect href="/auth" />
    );
}
