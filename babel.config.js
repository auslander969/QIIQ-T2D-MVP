module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // use 'babel-preset-expo' for Expo projects
    plugins: [
      'react-native-reanimated/plugin', // required for Reanimated
      // add other Babel plugins here if needed
    ],
  };
};
