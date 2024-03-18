import { type NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  // eslint-disable-next-line
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
// eslint-disable-next-line
export type RootStackParamList = {
  Dashboard: undefined
  Calendar: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
RootStackParamList,
Screen
>
