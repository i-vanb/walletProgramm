import React from 'react'
import {View, Dimensions} from 'react-native'
import Svg, {Circle, Path, Text} from 'react-native-svg'
import {AppText} from "./ui/AppText"
import {THEME} from "../theme"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {numToString} from "../utilities/numToString"
import {dateToStringMD} from "../utilities/dateToString";
import {getTodayInMS} from "../utilities/getTodayInMS";
import {lang} from "../utilities/lang";

const {width} = Dimensions.get('window')
const wrapSize = width / 5
const size = wrapSize * .8
const headerHeight = 40



export const ExpenseCard = ({name, sum, date, theme}) => {

    return (
        <View style={{
            width: wrapSize,
            alignItems: 'center',
            paddingVertical: 10
        }}>
            <AppText text={dateToStringMD(date)} color={THEME[theme].title} otherStyle={{padding: 0}}/>
            <MaterialCommunityIcons name='credit-card-minus-outline' size={size * 0.7} color={THEME[theme].expense}/>
            <AppText text={numToString(sum)} color={THEME[theme].back}
                     otherStyle={{backgroundColor: THEME[theme].expense, borderRadius: 15, paddingHorizontal: 10, paddingVertical: 0}}/>
            <View style={{height: headerHeight, width: '100%', justifyContent: 'center'}}>
                <AppText text={name} color={THEME[theme].title}/>
            </View>
        </View>
    )

}
