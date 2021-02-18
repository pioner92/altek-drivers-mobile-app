import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';





// const IBMPex400 = require('../assets/fonts/IBMPlexSans-Regular')


export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {

    const IBMPex400 = require('../assets/fonts/IBMPlexSans-Regular.ttf')
    const IBMPlex500 = require('../assets/fonts/IBMPlexSans-Medium.ttf')
    const IBMPex600 = require('../assets/fonts/IBMPlexSans-SemiBold.ttf')
    const IBMPex700 = require('../assets/fonts/IBMPlexSans-Bold.ttf')
    const NunitoSans = require('../assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf')

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          ...Ionicons.font,
          // 'space-mono': require('../'),
          'IBMPlex-400':IBMPex400,
          'IBMPlex-500':IBMPlex500,
          'IBMPlex-600':IBMPex600,
          'IBMPlex-700':IBMPex700,
          'Nunito Sans':NunitoSans,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
