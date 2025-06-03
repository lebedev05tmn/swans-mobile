import React, { useRef, useEffect, useState } from 'react'; // Вернули useState
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    Platform,
} from 'react-native';
import Button from '../../../shared/ui/Button';
import componentStyles from './style';
import { AuthMethod } from '@/src/shared/hooks/useAuthMethod';


const { height: screenHeight } = Dimensions.get('window');
const BASE_HEIGHT = 844;
const adaptivePixel = (pixelValue: number) => {
    return (pixelValue / BASE_HEIGHT) * screenHeight;
};
const lastButtonMarginBottom = adaptivePixel(65); 

const ANIMATION_BASE_DURATION = 500;

const SPRING_CONFIG = {
    tension: 60,
    friction: 10,
    useNativeDriver: true, 
};
const FADE_CONFIG = {
    duration: ANIMATION_BASE_DURATION / 2, 
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
};

type AuthModalProps = {
    authMethods: AuthMethod[];
    onClose: () => void;
    isVisible: boolean;
};

const AuthModal: React.FC<AuthModalProps> = ({
    authMethods,
    onClose,
    isVisible,
}) => {
    const [modalActuallyVisible, setModalActuallyVisible] = useState(isVisible);

    const translateYAnim = useRef(new Animated.Value(screenHeight)).current; 
    const opacityAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        if (isVisible) {
            setModalActuallyVisible(true);

            Animated.parallel([
                Animated.spring(translateYAnim, {
                    toValue: 0,
                    ...SPRING_CONFIG,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.5,
                    ...FADE_CONFIG,
                }),
            ]).start();
        } else {
            if (modalActuallyVisible) {
                Animated.parallel([
                    Animated.spring(translateYAnim, {
                        toValue: screenHeight,
                        ...SPRING_CONFIG,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        ...FADE_CONFIG,
                    }),
                ]).start(({ finished }) => {
                    if (finished) {
                        setModalActuallyVisible(false);
                    }
                });
            }
        }
    }, [isVisible, modalActuallyVisible, translateYAnim, opacityAnim]);

    const handleMethodPress = (action: () => void) => {
        onClose();

        action();
    };

    const handleCloseOnOverlay = () => {
        onClose();
    };

    if (!modalActuallyVisible) {
        return null;
    }

    const animatedContentStyle = {
        transform: [{ translateY: translateYAnim }],
    };
    const animatedOverlayStyle = {
        opacity: opacityAnim,
    };

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="auto">
            <Animated.View
                style={[styles.overlayBackground, animatedOverlayStyle]}
            >
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={handleCloseOnOverlay}
                />
            </Animated.View>

            <Animated.View
                style={[componentStyles.modalContent, animatedContentStyle]}
                pointerEvents={'box-none'}
            >
                <View style={componentStyles.contentInnerWrapper}>
                    <Text style={componentStyles.modalTitle}>
                        Выберите метод авторизации
                    </Text>

                    {authMethods.map((method, index) => {
                        const isLastButton = index === authMethods.length - 1;
                        const buttonSpecificStyle = isLastButton
                            ? { marginBottom: lastButtonMarginBottom }
                            : {};

                        return (
                            <Button
                                style={{
                                    ...componentStyles.authButton,
                                    ...buttonSpecificStyle,
                                }}
                                key={method.label + index}
                                onPress={() => handleMethodPress(method.action)}
                            >
                                <View style={componentStyles.buttonContent}>
                                    {method.icon && (
                                        <method.icon
                                            style={componentStyles.buttonIcon}
                                        />
                                    )}
                                    <Text style={componentStyles.buttonText}>
                                        {method.label}
                                    </Text>
                                </View>
                            </Button>
                        );
                    })}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlayBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: 'rgba(0, 0, 0, 1)',
        zIndex: 1000,
    },
});

export default AuthModal;
