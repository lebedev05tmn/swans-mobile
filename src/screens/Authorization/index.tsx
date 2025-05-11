import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Dimensions, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../shared/ui/Button';
import LogoSVG from '@/src/assets/svg/Loggo.svg';


import {
    useAuthMethods,
    AuthMethod,
} from '../../shared/hooks/useAuthMethod';
import AuthModal from '../../components/Authorization/Modal';
import styles from './style';
import { router } from 'expo-router';



const Authorization = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const { authMethods: baseAuthMethods } = useAuthMethods();

    const modalAuthMethods = useMemo<AuthMethod[]>(() => {
        return baseAuthMethods.map((method) => {
            if (method.label === 'Почта') {
                return {
                    ...method,
                    action: () => router.push('/emailauth'),
                };
            }
            return method;
        });
    }, [baseAuthMethods]);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const backAction = () => {
            if (modalVisible) {
                hideModal();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [modalVisible]);

    return (
        <LinearGradient
            colors={['#D1A1F2', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0.9, y: 0.8 }}
        >
            <View style={styles.container}>
                <View >
                    
                        <LogoSVG  />
                    
                </View>

                <View style={styles.bottomFlex}>
                    <View >
                        <Button onPress={showModal} style={styles.mainButton}>
                            <Text style={styles.mainButtonText}>Войти</Text>
                        </Button>
                    </View>
                    <Text style={styles.terms}>
                        Нажимая «Войти», ты соглашаешься с нашими{'\n'}
                        <Text style={styles.link}>Условиями</Text>.
                    </Text>
                </View>

                <AuthModal
                    authMethods={modalAuthMethods}
                    onClose={hideModal}
                    isVisible={modalVisible}
                />
            </View>
        </LinearGradient>
    );
};

export default Authorization;
