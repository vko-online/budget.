import { GestureHandlerRootView } from 'react-native-gesture-handler'

import React from 'react'
import { ActivityIndicator, LogBox, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { StatusBar } from 'expo-status-bar'
import { PersistGate } from 'redux-persist/integration/react'

import useCachedResources from 'src/components/useCachedResources'
import useColorScheme from 'src/components/useColorScheme'
import Navigation from 'src/navigation'
import { persistor, store } from 'src/store'

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.'])

export default function App (): JSX.Element | null {
  const isLoadingCompleted = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingCompleted) {
    return null
  } else {
    return (

      <SafeAreaProvider>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Provider store={store}>
            <GestureHandlerRootView style={styles.container}>
              <Navigation colorScheme={colorScheme} />
            </GestureHandlerRootView>
            <StatusBar />
          </Provider>
        </PersistGate>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  }
})
