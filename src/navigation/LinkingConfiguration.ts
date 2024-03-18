import { type LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { type RootStackParamList } from 'src/navigation/types'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Dashboard: {
        screens: {
          Dashboard: 'dashboard'
        }
      },
      Calendar: {
        screens: {
          Dashboard: 'Calendar'
        }
      }
    }
  }
}

export default linking
