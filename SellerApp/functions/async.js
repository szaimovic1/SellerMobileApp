import * as Font from 'expo-font';

export const getFonts = () => {
    return Font.loadAsync({
      'courgette-regular': require('../assets/fonts/Courgette-Regular.ttf'),
      'IndieFlower-Regular': require('../assets/fonts/IndieFlower-Regular.ttf')
    });
}