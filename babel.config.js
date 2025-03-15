module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '@src': './src',
                    '@components': './src/components',
                    '@assets': './src/assets',
                    '@screens': './src/screens',
                    '@shared': './src/shared',
                    '@app': './src/app',
                    '@hooks': './src/shared/hooks',
                    '@stores': './src/shared/stores',
                    '@config': './src/shared/config',
                },
            },
        ],
        'react-native-reanimated/plugin', // Этот плагин должен быть последним
    ],
};
