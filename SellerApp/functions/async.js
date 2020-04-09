import * as Font from 'expo-font';

export const getFonts = () => {
    return Font.loadAsync({
      'courgette-regular': require('../assets/fonts/Courgette-Regular.ttf')
    });
  }