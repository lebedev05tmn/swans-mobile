import React, { useState, useEffect, useMemo } from 'react'; // Стандартные хуки React
import { View, Text, Dimensions, BackHandler } from 'react-native'; // Компоненты и API React Native
import LinearGradient from 'react-native-linear-gradient'; // Компонент для градиента
import Button from '../../shared/ui/Button'; // Твоя кастомная кнопка
import LogoSVG from '@src/assets/svg/Loggo.svg'; // SVG Логотип
// Импорты из твоего файла с методами авторизации
import {
    useAuthMethods, // Хук для получения методов// Тип для параметров стека навигации
    AuthMethod, // Тип для объекта метода авторизации
} from '@src/shared/data/Authorization/useAuthMethods';
import AuthModal from '@src/components/Authorization/Modal'; // Компонент модального окна
import styles from './style'; // Стили для этого экрана
import { useNavigation } from '@react-navigation/native'; // Хук для доступа к навигации
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Тип для объекта navigation
import { RootStackParamList } from '@src/shared/types/Authorization/types';
// Получение размеров экрана
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Определение типа для navigation пропа этого экрана
type AuthorizationScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Authorization' // Имя этого экрана в Navigation.tsx
>;

// КОМПОНЕНТ ЭКРАНА (Убедись, что имя Authorization совпадает с тем, что в Navigation.tsx)
const Authorization = () => {
    // Состояние для управления видимостью модального окна
    const [modalVisible, setModalVisible] = useState(false);
    // Получаем объект navigation для переходов между экранами
    const navigation = useNavigation<AuthorizationScreenNavigationProp>();

    // 1. Получаем базовый массив методов из хука useAuthMethods
    const { authMethods: baseAuthMethods } = useAuthMethods();

    // 2. Создаем новый, модифицированный массив методов для передачи в модалку.
    //    Используем useMemo для оптимизации, чтобы массив не пересоздавался при каждом ререндере.
    const modalAuthMethods = useMemo(() => {
        // Проходим по каждому методу из базового массива
        return baseAuthMethods.map((method) => {
            // Если нашли метод с label 'Почта'
            if (method.label === 'Почта') {
                // Возвращаем копию этого метода, но с измененным свойством action
                return {
                    ...method, // Копируем label и icon
                    action: () => navigation.navigate('EmailRegistration'), // Новое действие - навигация
                };
            }
            // Если это любой другой метод, возвращаем его без изменений
            return method;
        });
    }, [baseAuthMethods, navigation]); // Зависимости: массив пересоздастся, если изменится baseAuthMethods или navigation

    // Функция для показа модального окна (устанавливает modalVisible в true)
    const showModal = () => {
        setModalVisible(true);
    };

    // Функция для скрытия модального окна (устанавливает modalVisible в false)
    const hideModal = () => {
        setModalVisible(false);
    };

    // Эффект для обработки системной кнопки "Назад" (на Android)
    useEffect(() => {
        // Функция, которая будет вызываться при нажатии кнопки "Назад"
        const backAction = () => {
            // Если модальное окно сейчас открыто
            if (modalVisible) {
                hideModal(); // Закрыть модальное окно
                return true; // Вернуть true, чтобы предотвратить стандартное действие (выход из приложения/переход назад)
            }
            // Если модальное окно закрыто, вернуть false, чтобы разрешить стандартное действие
            return false;
        };

        // Добавляем слушатель события 'hardwareBackPress'
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        // Функция очистки: удаляем слушатель при размонтировании компонента
        return () => backHandler.remove();
    }, [modalVisible]); // Зависимость от modalVisible: эффект будет пересоздан с актуальной функцией backAction, если modalVisible изменится

    // Рендеринг компонента (JSX разметка)
    return (
        <LinearGradient
            colors={['#D1A1F2', '#87CEEB']} // Цвета градиентного фона
            style={styles.gradient} // Стили для градиента
            start={{ x: 0.2, y: 0.2 }} // Начальная точка градиента
            end={{ x: 0.9, y: 0.8 }} // Конечная точка градиента
        >
            {/* Основной контейнер экрана */}
            <View style={styles.container}>
                {/* Верхняя часть с логотипом и текстом */}
                <View style={styles.topFlex}>
                    <Text style={styles.title}>SWANS</Text>
                    <View style={styles.logoContainer}>
                        <LogoSVG style={styles.logo} />
                    </View>
                    <Text style={styles.textStyle}>Найди своего соулмейта</Text>
                </View>

                {/* Нижняя часть с кнопкой и текстом условий */}
                <View style={styles.bottomFlex}>
                    <View style={styles.buttonBackground}>
                        {/* Кнопка "Войти", которая открывает модалку */}
                        <Button onPress={showModal} style={styles.mainButton}>
                            <Text style={styles.mainButtonText}>Войти</Text>
                        </Button>
                    </View>
                    <Text style={styles.terms}>
                        Нажимая «Войти», ты соглашаешься с нашими{'\n'}
                        <Text style={styles.link}>Условиями</Text>.
                    </Text>
                </View>

                {/* Компонент модального окна */}
                <AuthModal
                    authMethods={modalAuthMethods} // Передаем модифицированный массив методов
                    onClose={hideModal} // Функция для закрытия модалки
                    isVisible={modalVisible} // Передаем состояние видимости
                />
            </View>
        </LinearGradient>
    );
};

// Экспортируем компонент (убедись, что имя совпадает с тем, что в Navigation.tsx)
export default Authorization;
