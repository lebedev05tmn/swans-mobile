import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleProp, TextStyle } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import styles from './style';
import { router } from 'expo-router';

interface LinkData {
    text: string;
    disabledText?: string;
    timerDuration?: number;
    action?: string;
}

interface LinkProps {
    linkData: LinkData;
    currentIndex: number;
    onForgotPassword: () => void;
    changeCurrentIndex: () => void;
    style?: StyleProp<TextStyle>;
}

const Link: React.FC<LinkProps> = ({
    linkData,
    currentIndex,
    onForgotPassword,
    changeCurrentIndex,
    style,
}) => {
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        setTimer(0);
        setIsTimerActive(false);
        console.log(
            'Link: Reset timer on step change, currentIndex:',
            currentIndex,
        );
    }, [currentIndex]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0 && isTimerActive) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const startTimer = () => {
        if (linkData.timerDuration) {
            setTimer(linkData.timerDuration);
            setIsTimerActive(true);
        }
    };

    const handleLinkPress = () => {
        switch (linkData.action) {
            case 'log':
                router.navigate({
                    pathname: '/auth',
                    params: { openModal: 'true' },
                });
                break;
            case 'forgotPassword':
                runOnJS(onForgotPassword)();
                break;
            case 'requestCode':
            case 'requestPassword':
                if (timer === 0) {
                    startTimer();
                    console.log(
                        `Link pressed: Таймер запущен для ${linkData.action}`,
                    );
                }
                break;
            default:
                console.log('Link pressed: Неизвестное действие');
        }
    };

    const displayText =
        timer > 0 && linkData.disabledText
            ? linkData.disabledText.replace('{seconds}', timer.toString())
            : linkData.text;

    const isLinkDisabled = linkData.timerDuration ? timer > 0 : false;

    return (
        <TouchableOpacity
            onPress={handleLinkPress}
            disabled={isLinkDisabled}
            style={styles.linkContainer}
            activeOpacity={0.7}
        >
            <Text
                style={[
                    isLinkDisabled ? styles.disabledLink : styles.activeLink,
                    style,
                ]}
            >
                {displayText}
            </Text>
        </TouchableOpacity>
    );
};

export default Link;
