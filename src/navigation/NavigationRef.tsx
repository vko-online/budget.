import { CommonActions, type NavigationContainerRef } from '@react-navigation/native'

import { type RootStackParamList } from './types'

let _navigator: NavigationContainerRef<RootStackParamList>

function setTopLevelNavigator (navigatorRef: NavigationContainerRef<RootStackParamList>): void {
  _navigator = navigatorRef
}

function navigate (routeName: string, params?: object): void {
  _navigator.dispatch(
    CommonActions.navigate(routeName, params)
  )
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator
}
