import {
  Text as DefaultText,
  TextInput as DefaultTextInput,
  type TextInputProps as DefaultTextInputProps,
  type TextProps as DefaultTextProps,
  View as DefaultView
} from 'react-native'

import Colors from 'src/components/Colors'
import useColorScheme from 'src/components/useColorScheme'

interface ThemeColorProp {
  light?: string
  dark?: string
}

export function useThemeColor (
  props?: ThemeColorProp,
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const theme = useColorScheme()
  const colorFromProps = props?.[theme]

  if (colorFromProps != null) {
    return colorFromProps
  }
  if (colorName != null) {
    return Colors[theme][colorName]
  }
  throw new Error('No params supplied')
}

interface ThemeProps {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultTextProps & { center?: boolean, fontSize?: number }
export type ViewProps = ThemeProps & DefaultView['props']
export type TextInputProps = ThemeProps & DefaultTextInputProps & {
  lightBackgroundColor?: string
  darkBackgroundColor?: string
}

export function Text (props: TextProps): JSX.Element {
  const { style, lightColor, fontSize, center = false, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <DefaultText
      style={[{ color }, { fontSize, textAlign: center ? 'center' : 'auto' }, style]}
      {...otherProps}
    />
  )
}

export function TextInput (props: TextInputProps): JSX.Element {
  const { style, lightColor, darkColor, lightBackgroundColor, darkBackgroundColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const backgroundColor = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, 'background')
  const placeholderTextColor = useThemeColor({ light: Colors.light.placeholder, dark: Colors.dark.placeholder }, 'placeholder')

  return (
    <DefaultTextInput
      style={[{ color, backgroundColor }, style]}
      placeholderTextColor={placeholderTextColor}
      {...otherProps}
    />
  )
}

export function View (props: ViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return (
    <DefaultView
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  )
}
