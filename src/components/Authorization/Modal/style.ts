import { StyleSheet, Dimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const BASE_HEIGHT = 844; // Базовая высота для расчета адаптивности (например, iPhone 12/13/14)

// Функция для расчета адаптивной высоты/отступа
const adaptivePixel = (pixelValue: number) => {
    return (pixelValue / BASE_HEIGHT) * screenHeight;
};

// Адаптивные значения
const titleMarginBottom = adaptivePixel(20);
const buttonMarginBottom = adaptivePixel(12);
const buttonHeight = 50; // Оставляем фиксированную высоту для удобства нажатия
const contentMaxWidth = Math.min(350, screenWidth * 0.85); // Как и раньше

const styles = StyleSheet.create({
    // modalOverlay не используется напрямую в index.tsx, но может быть нужен для фона
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    // Контейнер модалки
    modalContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF', // Фон модалки
        paddingTop: adaptivePixel(20), // Адаптивный верхний отступ
        // Убираем общий paddingBottom, он будет задан последней кнопке
        paddingHorizontal: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: screenHeight * 0.8,
        alignItems: 'center',
        zIndex: 10001,
    },
    // Внутренняя обертка для контента
    contentInnerWrapper: {
        width: '100%',
        maxWidth: contentMaxWidth,
        alignItems: 'center',
        paddingHorizontal: 20, // Боковые отступы контента
    },
    // Заголовок
    modalTitle: {
        alignSelf: 'center',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: titleMarginBottom, // Адаптивный отступ снизу (20px)
        fontFamily: 'MontserratAlternates-Bold',
        color: '#333',
    },
    // Общий стиль для кнопок авторизации
    authButton: {
        width: '100%',
        height: buttonHeight, // Фиксированная высота (50px)
        backgroundColor: '#FFFFFF', // Фон как у модалки
        borderWidth: 1, // Граница 1px
        borderColor: '#666666', // Цвет границы
        borderRadius: 16, // Оставляем скругление
        marginBottom: buttonMarginBottom, // Адаптивный отступ снизу (12px) для всех кнопок по умолчанию
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // На всякий случай, если контент вылезет
    },
    // Контейнер для текста и иконки внутри кнопки
    buttonContent: {
        width: '100%',
        flexDirection: 'row-reverse', // Иконка справа
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    // Текст кнопки
    buttonText: {
        fontSize: 16,

        color: '#000000',
        fontFamily: 'Roboto-Medium',
    },
    // Иконка кнопки
    buttonIcon: {
        marginLeft: 15, // Отступ слева от иконки
        // Можно задать размер, если нужно
        // width: 20,
        // height: 20,
    },
});

export default styles;
