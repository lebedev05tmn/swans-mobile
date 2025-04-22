module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],

        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],

                    alias: {
                        '@': './',
                    },
                },
            ],
            [
                'inline-dotenv',
                {
                    path: './.env',
                    unsafe: false,
                },
            ],
            'react-native-reanimated/plugin', // Плагин reanimated обязательно должен быть последним
        ],
    };
};
