import React from 'react'
import {
  StyleSheet, View, Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import { THEME } from '../../theme'

export const AppButton = ({title, onPress, color = THEME.color.warm,
                            buttonStyle, textStyle, disabled}) => {
  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  const content = <View style={{ ...styles.button,
    backgroundColor: disabled? 'gray' :color, ...buttonStyle}}>
    <Text style={{...styles.text, ...textStyle}}>{typeof title === 'string' ? title.toUpperCase() : title}</Text>
  </View>


  return (disabled
          ? <View>{content}</View>
          : <Wrapper onPress={onPress} activeOpacity={0.7} children={content}/>
  )}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: THEME.color.light
  }
})
