import { View } from "react-native";
import { Text } from 'tamagui'


export default function Dashboard() {
  return (
    <View>
      <Text ta="right" fontSize="$2" cursor='pointer' color="$gray10" mb="$3" onPress={() => console.log('Lupa password')}>
        Web
      </Text>
    </View>
  );
}