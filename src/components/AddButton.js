import React, {useState} from 'react'
import {View, Dimensions, TouchableWithoutFeedback} from 'react-native'
import Svg, {Circle, Path, Text} from 'react-native-svg'
import {AppText} from "./ui/AppText";
import {THEME} from "../theme";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {numToString} from "../utilities/numToString"

const {width} = Dimensions.get('window')
const size = width / 5
const strokeWidth = size / 12
const radius = (size - strokeWidth) / 2


export const AddIncomeButton = ({theme, onPress = () => console.log('onpress')}) => {
    const [color, setColor] = useState(THEME[theme].empty)

    return (
        <TouchableWithoutFeedback
            onPressIn={
                ()=>setColor(THEME[theme].income)
            }
            onPress={onPress}
            onPressOut={
                ()=>setColor(THEME[theme].empty)
            }
        >
            <View>
                <Svg width={size} height={size}>
                    <Circle r={radius} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                            strokeWidth={strokeWidth} stroke={color} fill='none'/>
                    <Circle r={radius / 1.5} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                            fill={THEME[theme].income}/>
                    <View style={{
                        height: '100%',
                        backgroundColor: THEME.color.transparent,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MaterialCommunityIcons name="credit-card-plus-outline" size={radius}
                                                color={THEME[theme].back}/>
                    </View>
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    )
}


export const AddExpenseButton = ({theme, onPress=()=>console.log('onPress')}) => {
    const [color, setColor] = useState(THEME[theme].empty)

    return (
        <TouchableWithoutFeedback
            onPressIn={
                ()=>setColor(THEME[theme].expense)
            }
            onPress={onPress}
            onPressOut={
                ()=>setColor(THEME[theme].empty)
            }
        >
            <View>
                <Svg width={size} height={size}>
                    <Circle r={radius} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                            strokeWidth={strokeWidth} stroke={color} fill='none'/>
                    <Circle r={radius / 1.5} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                            fill={THEME[theme].expense}/>
                    <View style={{
                        height: '100%',
                        backgroundColor: THEME.color.transparent,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MaterialCommunityIcons name="credit-card-minus-outline" size={radius}
                                                color={THEME[theme].back}/>
                    </View>
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    )
}


export const AddPlanButton = ({theme, onPress=()=>console.log('onPress')}) => {
    const [color, setColor] = useState(THEME[theme].empty)

    return (
        <TouchableWithoutFeedback
            onPressIn={
                ()=>setColor(THEME[theme].plan)
            }
            onPress={onPress}
            onPressOut={
                ()=>setColor(THEME[theme].empty)
            }
        >
            <View>
                <Svg width={size} height={size}>
                    <Circle r={radius} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                            strokeWidth={strokeWidth} stroke={color} fill='none'/>
                    <Circle r={radius / 1.5} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                            fill={THEME[theme].plan}/>
                    <View style={{
                        height: '100%',
                        backgroundColor: THEME.color.transparent,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <MaterialCommunityIcons name="calendar-edit" size={radius}
                                                color={THEME[theme].back}/>
                    </View>
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    )
}


