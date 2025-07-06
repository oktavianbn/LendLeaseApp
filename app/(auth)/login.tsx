import { Input, Text, Button, YStack, Theme, TamaguiProvider, XStack } from 'tamagui'
import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { TextInput, useColorScheme } from 'react-native'
import React, { useRef, useState } from 'react'
import { loginUser } from '@/lib/auth'
import config from '@/tamagui.config'
import { useRouter } from 'expo-router'

export default function LoginForm() {
  const [usnOrEmail, setUsnOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ usnOrEmail: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  let type: 'nama' | 'email' = 'nama'

  const usnRef = useRef<TextInput>(null)
  const pwRef = useRef<TextInput>(null)

  const theme = useColorScheme()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const router = useRouter()

  // Pindah ke halaman login
  const handleLogin = async () => {
    setLoading(true)
    const newErrors = { usnOrEmail: '', password: '' }
    let firstErrorField: 'usnOrEmail' | 'password' | null = null

    if (!usnOrEmail.trim()) {
      newErrors.usnOrEmail = 'Username atau email wajib diisi.'
      firstErrorField = firstErrorField || 'usnOrEmail'
    }

    if (!password.trim()) {
      newErrors.password = 'Password wajib diisi.'
      if (!firstErrorField) firstErrorField = 'password'
    }

    // Jika ada error, fokuskan ke input pertama yang error
    if (firstErrorField) {
      setErrors(newErrors)
      if (firstErrorField === 'usnOrEmail') usnRef.current?.focus()
      else if (firstErrorField === 'password') pwRef.current?.focus()
      return
    }

    if (emailRegex.test(usnOrEmail.trim())) {
      type = 'email'
    } else {
      type = 'nama'
    }

    // Jika tidak ada error, lanjutkan
    let result = await loginUser(type, usnOrEmail, password)

    if (result == true) {
      router.replace('/(tabs)')

    } else {
      setErrors({
        usnOrEmail: '',
        password: 'Username atau Password salah!',
      })
      setUsnOrEmail('')
      setPassword('')
    }
    setLoading(false)
  }


  return (
    <TamaguiProvider config={config}>
      <Theme name={theme}>
        <YStack f={1} jc="center" ai="center" px="$4" bg="$background" minHeight="100vh">
          <YStack w="100%" maw={400} p="$4" br="$4" bg="$color2" shadowColor="$shadowColor" shadowRadius={10}>
            <Text fontSize="$6" fontWeight="bold" ta="center" mb="$4">Masuk</Text>

            <Input
              ref={usnRef}
              placeholder="Username atau Email"
              value={usnOrEmail}
              onChangeText={(text) => {
                setUsnOrEmail(text)
                if (text) setErrors((e) => ({ ...e, usnOrEmail: '' }))
              }}
              mb="$2"
            />
            {errors.usnOrEmail && <Text color="red" fontSize="$2" mb="$2">{errors.usnOrEmail}</Text>}

            <XStack ai="center" mb="$2">
              <Input
                ref={pwRef}
                placeholder="Password"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={(text) => {
                  setPassword(text)
                  if (text) setErrors((e) => ({ ...e, password: '' }))
                }}
                flex={1} // biar tidak tabrakan dengan tombol
              />

              <Button
                ml="$2"
                size="$2"
                chromeless
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </XStack>
            {errors.password && <Text color="red" fontSize="$2" mb="$3">{errors.password}</Text>}

            <Text ta="right" fontSize="$2" cursor='pointer' color="$gray10" mb="$4" onPress={() => console.log('Lupa password')}>
              Lupa password?
            </Text>

            <Button theme="active" mb="$2" onPress={handleLogin} disabled={loading}>{loading ? "Loading..." : "Masuk"}</Button>
            <XStack jc="center">
              <Text ta="center" fontSize="$2" cursor='pointer' color="$gray10">
                Belum punya akun?{" "}
              </Text>
              <Text ta="center" fontSize="$2" cursor='pointer' fontWeight="bold" color="$blue9" onPress={() => router.push('/signin')}>
                Signin
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}
