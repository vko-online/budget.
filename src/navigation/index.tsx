import React from 'react'
import { type ColorSchemeName } from 'react-native'

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import * as ExpoNotifications from 'expo-notifications'
import Colors from 'src/components/Colors'
import useColorScheme from 'src/components/useColorScheme'
import { type RootStackParamList } from 'src/navigation/types'
import CalendarScreen from 'src/screens/Calendar'
import DashboardScreen from 'src/screens/Dashboard'

import LinkingConfiguration from './LinkingConfiguration'
import NavigationRef from './NavigationRef'

export default function Navigation ({ colorScheme }: { colorScheme: ColorSchemeName }): JSX.Element {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      ref={(ref) => {
        if (ref != null) {
          NavigationRef.setTopLevelNavigator(ref)
        }
      }}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator (): JSX.Element {
  const colorScheme = useColorScheme()

  return (
    <Stack.Navigator initialRouteName="Dashboard"

      screenOptions={{ contentStyle: { backgroundColor: Colors[colorScheme].background } }}>
      <Stack.Screen name='Dashboard' component={DashboardScreen} />
      <Stack.Screen name='Calendar' component={CalendarScreen} />
    </Stack.Navigator>
  )
}
