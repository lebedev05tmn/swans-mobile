import { FC, PropsWithChildren } from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import styles from './style';

type TButtonWithCounterProps = {
    maxNumber: number;
    usedNumber: number;
};

type TButtonWithCounter = TouchableOpacityProps &
    PropsWithChildren &
    TButtonWithCounterProps;

const ButtonWithCounter: FC<TButtonWithCounter> = ({
    children,
    maxNumber,
    usedNumber,
    ...props
}) => {
    return (
        <View>
            <TouchableOpacity
                {...props}
                style={[
                    styles.button,
                    { opacity: maxNumber - usedNumber === 0 ? 0.75 : 1 },
                ]}
                disabled={maxNumber - usedNumber === 0}
                activeOpacity={0.75}
            >
                {children}
            </TouchableOpacity>
            <View style={[styles.counter]}>
                <Text style={styles.counterText}>{maxNumber - usedNumber}</Text>
            </View>
        </View>
    );
};

export default ButtonWithCounter;
