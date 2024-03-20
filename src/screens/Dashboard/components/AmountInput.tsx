import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import PickerSelect from 'react-native-picker-select'

import { Ionicons } from '@expo/vector-icons'

import categories from 'src/components/categories'
import Colors from 'src/components/Colors'
import { useThemeColor, View } from 'src/components/Themed'
import { type CalendarInput } from 'src/store/slices/calendar'

interface Props {
  onSubmit: (input: CalendarInput) => void
}
export default function AmountInput ({ onSubmit }: Props): JSX.Element {
  const [category, setCategory] = useState<string>('')
  const [amount, setAmount] = useState<number | null>(null)
  const [title, setTitle] = useState<string>()

  const iconColor = useThemeColor({
    light: Colors.dark.text,
    dark: Colors.light.text
  }, 'text')
  const color = useThemeColor({
    light: Colors.dark.text,
    dark: Colors.light.text
  }, 'text')
  const shadowColor = useThemeColor({
    light: Colors.dark.background,
    dark: Colors.light.background
  }, 'background')
  const placeholderTextColor = useThemeColor({
    light: Colors.dark.placeholder,
    dark: Colors.light.placeholder
  }, 'placeholder')

  const handleSubmit = useCallback(() => {
    if (amount === 0 || amount === null || category === '') {
      return
    }
    onSubmit({
      amount,
      category,
      title
    })
    setAmount(0)
    setTitle('')
    setCategory('')
  }, [onSubmit, amount, category, title, setAmount, setTitle, setCategory])

  const sortedCategories = categories.sort((a, b) => {
    if (a.title < b.title) {
      return -1
    }
    if (a.title > b.title) {
      return 1
    }
    return 0
  })

  return (
    <KeyboardAvoidingView behavior='position'>
      <View style={[styles.container, { shadowColor }]} darkColor={Colors.light.background} lightColor={Colors.dark.background}>
        <PickerSelect
          value={category}
          placeholder={{
            label: '❓ Unknown',
            value: 'Unknown',
            inputLabel: '❓',
            color: 'red'
          }}
          itemKey='title'
          textInputProps={{
            placeholder: 'test'
          }}
          style={{
            viewContainer: styles.picker
          }}
          onValueChange={(value) => {
            setCategory(value as string)
            setTitle(value as string)
          }}
          items={sortedCategories.map(v => ({
            label: `${v.icon} ${v.title}`,
            value: v.title,
            inputLabel: v.icon
          }))}
        />
        <View style={styles.divider} />
        <View style={styles.amountContainer} darkColor={Colors.light.background} lightColor={Colors.dark.background}>
          <CurrencyInput
            value={amount}
            onChangeValue={setAmount}
            prefix="$"
            placeholder='$0'
            precision={0}
            placeholderTextColor={placeholderTextColor}
            style={[styles.amountInput, {
              color
            }]}
            minValue={0}
          />
        </View>
        <View style={styles.divider} lightColor={Colors.dark.placeholder} darkColor={Colors.light.placeholder} />
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Ionicons name='add-sharp' size={24} color={iconColor} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowOpacity: 0.75,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 1
    },
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    borderRadius: 100,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 10
  },
  amountInput: {
    width: 100,
    textAlign: 'center',
    fontSize: 24
  },
  picker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
