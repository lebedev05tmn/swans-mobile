import Button from '@/src/shared/ui/Button';
import { FC, PropsWithChildren } from 'react';
import { PressableProps, ViewStyle } from 'react-native';
import styles from './styles';

type TButton = {
    style?: ViewStyle;
    disabled?: boolean;
    onPress?: PressableProps['onPress'];
};

const Point: FC<PropsWithChildren<TButton>> = ({
    children,
    style,
    disabled,
    onPress,
}) => {
    return (
        <Button style={styles.point} disabled={disabled} onPress={onPress}>
            {children}
        </Button>
    );
};

export default Point;
