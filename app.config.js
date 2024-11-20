/**
 * @type {import('expo/ExpoConfig').ExpoConfig}
 */
module.exports = function (config) {
  return {
    ...config,
    expo: {
      ...config.expo,
      extra: {
        assets: ['./assets/fonts/MontserratAlternates-Bold.ttf'],
      },
    },
  };
};
