import React from 'react'
import {View, Dimensions} from 'react-native'
import Svg, {Circle} from 'react-native-svg'
import {AppText} from "./ui/AppText"
import {THEME} from "../theme"
import { Foundation } from '@expo/vector-icons'
import {MaterialCommunityIcons, FontAwesome5} from "@expo/vector-icons"
import {numToString} from "../utilities/numToString"
import {dateToStringMD} from "../utilities/dateToString";

const {width} = Dimensions.get('window')
const wrapSize = width/5
const size = wrapSize / 1.3
const strokeWidth = size / 15
const radius = (size - strokeWidth) / 2

export const IncomeCard = ({name, sum, date, theme}) => {
    if(!sum) {
        return (
            <View style={{
                width: wrapSize,
                backgroundColor: THEME[theme].income,
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center'

            }}>
                <FontAwesome5 name="money-bill-wave" size={24} color={THEME[theme].back} />
                    {/*<MaterialCommunityIcons name="credit-card-plus-outline" size={24}*/}
                    {/*                        color={THEME[theme].back}/>*/}
               </View>
        )
    }

        return (
        <View style={{
            width: wrapSize,
            alignItems: 'center',
            padding: 5
        }}>
            {/*<AppText text={dateToStringMD(date)} color={THEME[theme].title}/>*/}
            <AppText text={name} color={THEME[theme].title} otherStyle={{padding: 0}}/>
                    {/*<Foundation name='dollar' size={radius} color={THEME[theme].income}/>*/}
            <FontAwesome5 name="money-bill-wave" size={24} color={THEME[theme].income} />
                <AppText text={numToString(sum)}
                         color={THEME[theme].income}
                         // fontSize={strokeWidth * 3}
                         otherStyle={{padding: 0}}/>
        </View>
    )
}
