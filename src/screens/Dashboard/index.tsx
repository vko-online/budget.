import { useCallback } from 'react'
import { SectionList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { formatRelative, fromUnixTime, getUnixTime, startOfDay } from 'date-fns'
import { enNZ } from 'date-fns/locale'

import { Text, View } from 'src/components/Themed'
import { type RootStackScreenProps } from 'src/navigation/types'
import { useAppDispatch, useAppSelector } from 'src/store'
import { addEntry, type CalendarData, type CalendarInput } from 'src/store/slices/calendar'

import AmountInput from './components/AmountInput'
import { SectionHeader, SectionItem } from './components/Item'

const formatRelativeLocale = {
  lastWeek: 'dd MMMM',
  yesterday: '\'Yesterday\'',
  today: '\'Today\'',
  tomorrow: '\'Tomorrow\'',
  nextWeek: '\'Next Week\'',
  other: 'dd MMMM'
}

const locale = {
  ...enNZ,
  formatRelative: (token: keyof typeof formatRelativeLocale) => formatRelativeLocale[token]
}

type Accumulator = Array<{
  date: number
  data: CalendarData[]
}>

export default ({
  navigation
}: RootStackScreenProps<'Dashboard'>): JSX.Element => {
  const data = useAppSelector(store => store.calendar.data)
  const appDispatch = useAppDispatch()

  const grouped = data.reduce<Accumulator>((acc, item) => {
    const date = getUnixTime(startOfDay(fromUnixTime(item.date)))

    const index = acc.findIndex(v => v.date === date)
    if (index === -1) {
      acc.push({
        date,
        data: [item]
      })
    } else {
      acc[index].data = [...acc[index].data, item]
    }
    return acc
  }, [])

  const handleSubmit = useCallback((input: CalendarInput) => {
    appDispatch(addEntry(input))
  }, [appDispatch])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        // sections={DATA}
        sections={grouped}
        contentContainerStyle={{ flex: 1 }}
        keyExtractor={item => item.id}
        ListEmptyComponent={(
          <View style={styles.empty}>
            <Text fontSize={24}>No records</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} darkColor='#333' lightColor='#eee' />}
        renderItem={({ item }) => (
          <SectionItem data={item} />
        )}
        renderSectionHeader={({ section: { date, data } }) => (
          <SectionHeader title={formatRelative(fromUnixTime(date), new Date(), { locale })} value={data.map(v => v.amount).reduce((v, a) => v + a, 0)} />
        )}
      />
      <AmountInput onSubmit={handleSubmit} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%'
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})
