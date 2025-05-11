import React from 'react';
import { Platform } from 'react-native';
import { SvgProps } from 'react-native-svg';
import TgIcon from '../../../assets/svg/tg.svg';
import VkIcon from '../../../assets/svg/vk.svg';
import AppleIcon from '../../../assets/svg/macbookers.svg';
import MailIcon from '../../../assets/svg/mail.svg';
import { router } from 'expo-router';
import { handleTelegramAuth } from '@/src/shared/hooks/useTelegram';
import { handleAppleAuth } from '@/src/shared/hooks/useApple';
import { handleVKAuth } from '@/src/shared/hooks/useVK';
import { Link } from 'expo-router';

export type AuthMethod = {
    label: string;
    action: () => void; //
    icon: React.ComponentType<SvgProps>;
};

export const useAuthMethods = (): { authMethods: AuthMethod[] } => {
    const authMethods: AuthMethod[] = [
        {
            label: 'Telegram',
            action: handleTelegramAuth,
            icon: TgIcon,
        },
        {
            label: 'ВКонтакте',

            action: handleVKAuth,
            icon: VkIcon,
        },
        ...(Platform.OS === 'ios'
            ? [
                  {
                      label: 'Apple ID',
                      action: () => handleAppleAuth,
                      icon: AppleIcon,
                  },
              ]
            : []),
        {
            label: 'Почта',
            action: () => router.push('/emailauth'),
            icon: MailIcon,
        },
    ];

    return { authMethods };
};
