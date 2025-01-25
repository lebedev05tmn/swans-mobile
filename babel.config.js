module.exports = function (api) {
    api.cache(true);

    return {
        presets: [
            'babel-preset-expo', // Убираем nativewind preset
        ],

        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],

                    alias: {
                        '@': './',
                        'tailwind.config': './tailwind.config.js',
                    },
                },
            ],
            'react-native-reanimated/plugin', // Плагин reanimated обязательно должен быть последним
        ],
    };
};
