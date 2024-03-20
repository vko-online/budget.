import Swipeable from 'react-native-gesture-handler/Swipeable'

import { useCallback } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'

import categories from 'src/components/categories'
import Colors from 'src/components/Colors'
import { Text, View } from 'src/components/Themed'
import { useAppDispatch } from 'src/store'
import { type CalendarData, removeEntry } from 'src/store/slices/calendar'

interface SectionItemProps {
  data: CalendarData
}

interface SectionHeaderProps {
  title: string
  value: number
}

export function SectionItem ({ data }: SectionItemProps): JSX.Element {
  const appDispatch = useAppDispatch()
  const icon = categories.find(v => v.title === data.category)?.icon
  const handleClose = useCallback(() => {
    appDispatch(removeEntry(data.id))
  }, [appDispatch])
  return (
    <Swipeable overshootRight={false} renderRightActions={(progress, dragX) => <RightAction dragX={dragX} onClose={handleClose} />}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Text>{icon ?? data.category}</Text>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <Text style={styles.amount}>
          <Text fontSize={16} lightColor={Colors.light.placeholder} darkColor={Colors.dark.placeholder}>$</Text>
          {data.amount}
        </Text>
      </View>
    </Swipeable>
  )
}

interface RightActionProps {
  onClose: () => void
  dragX: ReturnType<Animated.Value['interpolate']>
}

function RightAction (props: RightActionProps): JSX.Element {
  const trans = props.dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0]
  })
  return (
    <Pressable style={styles.actionButton} onPress={props.onClose}>
      <Animated.Text
        style={[
          styles.actionText,
          {
            transform: [{ translateX: trans }]
          }
        ]}>
        Delete
      </Animated.Text>
    </Pressable>
  )
}

export function SectionHeader ({ title, value }: SectionHeaderProps): JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.amountSum}>
        <Text fontSize={14} lightColor={Colors.light.placeholder} darkColor={Colors.dark.placeholder}>$</Text>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  title: {
    marginLeft: 10,
    fontSize: 18
  },
  amount: {
    fontSize: 16,
    textAlignVertical: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    fontSize: 26
  },
  amountSum: {
    fontSize: 18,
    textAlignVertical: 'center'
  },
  currency: {
    fontSize: 14
  },
  currencySum: {
    fontSize: 16
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: 'red'
  },
  actionText: {
    color: '#fff'
  }
})
