import { StyleSheet, Text, View } from 'react-native'

import { type RootStackScreenProps } from 'src/navigation/types'

export default ({
  navigation
}: RootStackScreenProps<'Calendar'>): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
})
