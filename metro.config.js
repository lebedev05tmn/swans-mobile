const { getDefaultConfig } = require('expo/metro-config');
const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

module.exports = (() => {
    const config = getDefaultConfig(__dirname);

    const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    };

    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...resolver.sourceExts, 'svg'],
    };

    // Добавляем CORS middleware
    config.server = {
        enhanceMiddleware: (middleware, server) => {
            return (req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                
                if (req.method === 'OPTIONS') {
                    return res.end();
                }
                
                return middleware(req, res, next);
            };
        },
    };

    return wrapWithReanimatedMetroConfig(config);
})();
