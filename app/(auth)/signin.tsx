import {
  Input,
  Text,
  Button,
  YStack,
  Theme,
  TamaguiProvider,
  XStack,
  Label,
  Select,
} from 'tamagui'
import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { TextInput, useColorScheme } from 'react-native'
import { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import config from '@/tamagui.config'
import { createUser } from '@/lib/auth'

export default function CreateAccountForm() {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const role = 'pengguna'

  const [errors, setErrors] = useState({
    nama: '',
    email: '',
    password: '',
  })

  const namaRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const pwRef = useRef<TextInput>(null)

  const theme = useColorScheme()

  const router = useRouter()

const handleSubmit = async () => {
  setLoading(true)
  const newErrors = { nama: '', email: '', password: '' }
  let firstErrorField: keyof typeof newErrors | null = null

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordStrongRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (!nama.trim()) {
    newErrors.nama = 'Nama wajib diisi.'
    firstErrorField = 'nama'
  }

  if (!email.trim()) {
    newErrors.email = 'Email wajib diisi.'
    if (!firstErrorField) firstErrorField = 'email'
  } else if (!emailRegex.test(email.trim())) {
    newErrors.email = 'Format email tidak valid.'
    if (!firstErrorField) firstErrorField = 'email'
  }

  if (!password.trim()) {
    newErrors.password = 'Password wajib diisi.'
    if (!firstErrorField) firstErrorField = 'password'
  } else if (!passwordStrongRegex.test(password.trim())) {
    newErrors.password = 'Gunakan minimal 8 karakter dan kombinasi huruf & angka.'
    if (!firstErrorField) firstErrorField = 'password'
  }

  if (firstErrorField) {
    setErrors(newErrors)
    if (firstErrorField === 'nama') namaRef.current?.focus()
    else if (firstErrorField === 'email') emailRef.current?.focus()
    else if (firstErrorField === 'password') pwRef.current?.focus()
    setLoading(false)
    return
  }

  const result = await createUser(nama, email, password, role)

  if (!result.success) {
    const errorObj = { nama: '', email: '', password: '' }
    if (result.emailTaken === true) {
      errorObj.email = 'Email sudah digunakan'
    }
    if (result.namaTaken === true) {
      errorObj.nama = 'Nama sudah digunakan'
    }
    setErrors(errorObj)
  } else {
    // Reset form dan arahkan ke halaman utama
    setNama('')
    setEmail('')
    setPassword('')
    setErrors({ nama: '', email: '', password: '' })
    router.replace('/(tabs)')
  }

  setLoading(false)
}


  return (
    <TamaguiProvider config={config}>
      <Theme name={theme}>
        <YStack f={1} jc="center" ai="center" px="$4" bg="$background" minHeight="100vh">
          <YStack w="100%" maw={400} p="$4" br="$4" bg="$color2" shadowColor="$shadowColor" shadowRadius={10}>
            <Text fontSize="$6" fontWeight="bold" ta="center" mb="$4">Buat Akun</Text>

            <Input
              ref={namaRef}
              placeholder="Nama Lengkap"
              value={nama}
              onChangeText={(text) => {
                setNama(text)
                if (text) setErrors((e) => ({ ...e, nama: '' }))
              }}
              mb="$2"
            />
            {errors.nama && <Text color="red" fontSize="$2" mb="$2">{errors.nama}</Text>}

            <Input
              ref={emailRef}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text)
                if (text) setErrors((e) => ({ ...e, email: '' }))
              }}
              mb="$2"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && <Text color="red" fontSize="$2" mb="$2">{errors.email}</Text>}

            <XStack ai="center" mb="$2">
              <Input
                ref={pwRef}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text)
                  if (text) setErrors((e) => ({ ...e, password: '' }))
                }}
                flex={1}
              />
              <Button ml="$2" size="$2" chromeless onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </XStack>
            {errors.password && <Text color="red" fontSize="$2" mb="$0">{errors.password}</Text>}
            <Button theme="active" mb="$2" mt="$6" onPress={handleSubmit} disabled={loading}>{loading ? "Loading..." : "Daftar"}</Button>
            <XStack jc="center">
              <Text ta="center" fontSize="$2" cursor='pointer' color="$gray10">
                Sudah punya akun?{" "}
              </Text>
              <Text ta="center" fontSize="$2" cursor='pointer' fontWeight="bold" color="$blue9" onPress={() => router.push('/login')}>
                Login
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}
