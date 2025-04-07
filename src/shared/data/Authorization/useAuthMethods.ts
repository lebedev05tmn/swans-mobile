// src/shared/data/Authorization/useAuthMethods.ts

import React from 'react';
import { Platform } from 'react-native';
import { SvgProps } from 'react-native-svg';
import TgIcon from '@src/assets/svg/tg.svg';
import VkIcon from '@src/assets/svg/vk.svg';
import AppleIcon from '@src/assets/svg/macbookers.svg';
import MailIcon from '@src/assets/svg/mail.svg';
import { openTelegramForAuth } from '@src/shared/hooks/useTelegramAuth';
// Убедись, что путь импорта правильный
import { handleVKAuth } from '@src/shared/hooks/useVKAuth'; // <--- Импорт для ВК

export type AuthMethod = {
    label: string;
    action: () => void; // или () => Promise<void>, если нужно учитывать асинхронность
    icon: React.ComponentType<SvgProps>;
};

export const useAuthMethods = (): { authMethods: AuthMethod[] } => {
    const authMethods: AuthMethod[] = [
        {
            label: 'Telegram',
            action: openTelegramForAuth,
            icon: TgIcon,
        },
        {
            label: 'ВКонтакте',
            // Просто передаем ссылку на функцию handleVKAuth
            action: handleVKAuth, // <--- ИСПРАВЛЕНО ЗДЕСЬ
            icon: VkIcon,
        },
        ...(Platform.OS === 'ios'
            ? [
                  {
                      label: 'Apple ID',
                      action: () => console.log('Apple ID Auth'),
                      icon: AppleIcon,
                  },
              ]
            : []),
        {
            label: 'Почта',
            action: () => console.log('Email base action'),
            icon: MailIcon,
        },
    ];

    return { authMethods };
};
