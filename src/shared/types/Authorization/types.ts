import { SvgProps } from 'react-native-svg';
import { ReactElement } from 'react';

export type AuthMethod = {
    label: string;
    action: () => void;
    icon: React.FC<SvgProps>;
};

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Authorization: undefined;
    CreateProfile: undefined;
    Loading: undefined;
    EmailRegistration: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
