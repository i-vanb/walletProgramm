import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {THEME} from '../../theme'

export const AppText = ({fontSize, color=THEME.color.dark, text, otherStyle}) => {
    return (
        <View>
            <Text style={{...styles.container, color, fontSize, ...otherStyle}}>
                {text}
            </Text>
        </View>
    )
}


// const content = <View style={{ ...styles.button,
//   backgroundColor: disabled? 'gray' :color, ...buttonStyle}}>
//   <Text style={{...styles.text, ...textStyle}}>{typeof title === 'string' ? title.toUpperCase() : title}</Text>
// </View>


// return (disabled
//         ? <View>{content}</View>
//         : <Wrapper onPress={onPress} activeOpacity={0.7} children={content}/>
// )}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 5,
        fontFamily: 'bitter-regular',
        fontSize: 16,
        color: 'black'
    }
})
