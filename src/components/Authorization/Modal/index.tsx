import React, { useRef, useEffect, useState } from 'react'; // Вернули useState
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated, // Вернули Animated
    Easing, // Вернули Easing
    Platform,
} from 'react-native';
import Button from '@src/shared/ui/Button'; // Путь к вашему компоненту Button
import { SvgProps } from 'react-native-svg';
import componentStyles from './style'; // Импорт стилей из style.ts
import { AuthMethod } from '@src/shared/data/Authorization/useAuthMethods'; // Путь к вашему типу

// --- Адаптивный расчет (оставляем) ---
const { height: screenHeight } = Dimensions.get('window');
const BASE_HEIGHT = 844; // Базовая высота (должна совпадать с той, что в style.ts)
const adaptivePixel = (pixelValue: number) => {
    return (pixelValue / BASE_HEIGHT) * screenHeight;
};
const lastButtonMarginBottom = adaptivePixel(65); // Адаптивный отступ для последней кнопки (65px)
// --- Конец адаптивного расчета ---

// --- Константы анимации (как в удачном варианте) ---
const ANIMATION_BASE_DURATION = 500; // Ориентировочная длительность для фона

const SPRING_CONFIG = {
    tension: 60,
    friction: 10,
    // bounciness: 8,
    // speed: 12,
    useNativeDriver: true, // <-- Обязательно для плавности
};
const FADE_CONFIG = {
    duration: ANIMATION_BASE_DURATION / 1.5, // Фон чуть быстрее
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true, // <-- Обязательно для плавности
};
// --- Конец констант анимации ---

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
    // Состояние для управления монтированием/демонтированием ПОСЛЕ анимации закрытия
    const [modalActuallyVisible, setModalActuallyVisible] = useState(isVisible);

    // Animated values
    const translateYAnim = useRef(new Animated.Value(screenHeight)).current; // Начинаем за экраном
    const opacityAnim = useRef(new Animated.Value(0)).current; // Начинаем с прозрачного фона

    useEffect(() => {
        if (isVisible) {
            // --- Показываем ---
            // Сначала делаем компонент видимым в React дереве
            setModalActuallyVisible(true);
            // Запускаем анимации появления
            Animated.parallel([
                Animated.spring(translateYAnim, {
                    toValue: 0, // В конечную позицию
                    ...SPRING_CONFIG,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.5, // Полупрозрачный фон
                    ...FADE_CONFIG,
                }),
            ]).start();
        } else {
            // --- Скрываем ---
            // Запускаем анимации скрытия ТОЛЬКО ЕСЛИ он сейчас видим
            if (modalActuallyVisible) {
                Animated.parallel([
                    Animated.spring(translateYAnim, {
                        toValue: screenHeight, // За экран
                        ...SPRING_CONFIG,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0, // Полностью прозрачный
                        ...FADE_CONFIG,
                    }),
                ]).start(({ finished }) => {
                    // После завершения анимации скрытия, демонтируем компонент
                    if (finished) {
                        setModalActuallyVisible(false);
                    }
                });
            }
        }
    }, [isVisible, modalActuallyVisible, translateYAnim, opacityAnim]); // Добавили modalActuallyVisible в зависимости

    // Обработчик нажатия на метод авторизации (упрощенный)
    const handleMethodPress = (action: () => void) => {
        // 1. Вызываем onClose(), чтобы родительский компонент изменил isVisible
        //    Это запустит анимацию закрытия в useEffect
        onClose();
        // 2. СРАЗУ выполняем действие (редирект, логин и т.д.)
        //    Анимация закрытия будет идти параллельно
        action();
    };

    // Обработчик закрытия по тапу на фон
    const handleCloseOnOverlay = () => {
        onClose(); // Просто запускаем закрытие
    };

    // Если компонент не должен быть видимым (включая момент ПОСЛЕ анимации скрытия), ничего не рендерим
    if (!modalActuallyVisible) {
        return null;
    }

    // Анимированные стили
    const animatedContentStyle = {
        transform: [{ translateY: translateYAnim }],
    };
    const animatedOverlayStyle = {
        opacity: opacityAnim,
    };

    // Если видима, рендерим анимированное содержимое
    return (
        // Обертка, чтобы перехватывать события, пока модалка видима
        <View style={StyleSheet.absoluteFill} pointerEvents="auto">
            {/* 1. Фон (Overlay) - теперь анимированный */}
            <Animated.View
                style={[styles.overlayBackground, animatedOverlayStyle]}
            >
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={handleCloseOnOverlay}
                />
            </Animated.View>

            {/* 2. Контейнер контента модалки - теперь анимированный */}
            <Animated.View
                style={[
                    componentStyles.modalContent, // Базовые стили из style.ts
                    animatedContentStyle, // Анимированный transform
                ]}
                pointerEvents={'box-none'} // Клики проходят к кнопкам
            >
                {/* Внутренняя обертка */}
                <View style={componentStyles.contentInnerWrapper}>
                    {/* Заголовок */}
                    <Text style={componentStyles.modalTitle}>
                        Выберите метод авторизации
                    </Text>

                    {/* Рендеринг кнопок */}
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
                                // disabled убрали, т.к. убрали сложную логику блокировки
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

// Локальные стили (только для фона)
const styles = StyleSheet.create({
    overlayBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Ставим НЕпрозрачный цвет, т.к. анимируем opacity
        backgroundColor: 'rgba(0, 0, 0, 1)',
        zIndex: 1000, // Должен быть ниже контента
    },
});

export default AuthModal;
