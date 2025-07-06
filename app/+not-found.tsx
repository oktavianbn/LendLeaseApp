import { Link, Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider, Theme, Text, YStack, Button } from 'tamagui'
import config from '@/tamagui.config'

export default function NotFoundScreen() {
  const theme = useColorScheme() ?? 'light'

  return (
    <TamaguiProvider config={config}>
      <Theme name={theme}>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <YStack f={1} jc="center" ai="center" px="$4" space="$4" bg="$background">
          <Text fontSize={48} fontWeight="bold" color="$color">
            404
          </Text>
          <Text fontSize={20} textAlign="center" color="$color">
            Halaman yang kamu cari tidak ditemukan.
          </Text>
          <Link href="/(tabs)" asChild>
            <Button theme="active" size="$4" mt="$3">
              Kembali ke Beranda
            </Button>
          </Link>
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}
