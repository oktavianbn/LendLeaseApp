import 'dotenv/config'
import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'lendleaseapp',
  slug: 'lendleaseapp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'lendleaseapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: 'b5059285-7798-4ade-9213-33db8238cd69',
    },
    apiKey: process.env.ENVI_LOCALE_API_KEY,
    authDomain: process.env.ENVI_LOCALE_AUTH_DOMAIN,
    databaseURL: process.env.ENVI_LOCALE_DATA_BASE_URL,
    projectId: process.env.ENVI_LOCALE_PROJECT_ID,
    storageBucket: process.env.ENVI_LOCALE_STORAGE_BUCKET,
    messagingSenderId: process.env.ENVI_LOCALE_MESSAGING_SENDER_ID,
    appId: process.env.ENVI_LOCALE_APP_ID,
    measurementId: process.env.ENVI_LOCALE_MEASUREMENT_ID,
  },
    owner: 'oktavianbagasnugroho',
})
