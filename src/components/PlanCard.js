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
const strokeWidth = size / 12
// const radius = (size - strokeWidth) / 2
const headerHeight = 40

const degToRad = (deg) => {
    const rad = deg / (180 / Math.PI)
    return Math.round(rad * 10000) / 10000
}

const arc = (startAngle, endAngle, radius, strokeWidth, color) => {
    const x1 = (radius * Math.cos(degToRad(startAngle))) + radius + strokeWidth / 2
    const x2 = (radius * Math.cos(degToRad(endAngle))) + radius + strokeWidth / 2
    const y1 = radius + strokeWidth / 2 - (radius * Math.sin(degToRad(startAngle)))
    const y2 = radius + strokeWidth / 2 - (radius * Math.sin(degToRad(endAngle)))

    const renderPart = () => {
        if (startAngle > endAngle) {
            if (startAngle - endAngle >= 180) {
                return '1'
            } else return '0'
        } else {
            if (endAngle - startAngle <= 180) {
                return '1'
            } else return '0'
        }}

    return (
        <Path d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${renderPart()} 1 ${x2} ${y2}`}
              stroke={color}
              fill="none"
              strokeWidth={strokeWidth}
            strokeLinecap='round'
        />
    )}


export const PlanCard = ({name, sum, date, theme, deadline}) => {
    const inactive = THEME[theme].empty
    if (deadline === 0) {
        return (
            <View style={{
                width: wrapSize,
                // justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
            }}>
                <View style={{height: headerHeight, width: '100%', justifyContent: 'center'}}>
                    <AppText text={name} color={THEME[theme].title}/>
                </View>

                <View style={{
                    width: size, height: size + strokeWidth, alignItems: 'center', justifyContent: 'center',
                    // backgroundColor: 'green',
                    // backgroundColor: THEME.color.transparent
                }}>
                    <MaterialCommunityIcons name='calendar-blank' size={size*0.7} color={THEME[theme].plan}/>

                    <View style={{width: size, height: size/4, minHeight: 10, position: 'absolute', top: size-strokeWidth*1.5,
                        backgroundColor: THEME[theme].plan, borderRadius: size/4, justifyContent: 'center'
                    }}>
                        <AppText text={numToString(sum)} color={THEME[theme].main} otherStyle={{padding: 0}}/>
                    </View>
                </View>
                <View style={{position: 'absolute', top: headerHeight + size - strokeWidth * 1.5}}>
                    <AppText text={daysLeft} fontSize={strokeWidth * 1.8} otherStyle={{padding: 0}}
                             color={THEME[theme].back}/>
                </View>
            </View>
        )
    }



    const zero = 240
    const full = -60
    const days = deadline ? (deadline - date) / 1000 / 60 / 60 / 24 : 0
    const daysLeft = deadline ? (deadline - getTodayInMS()) / 1000 / 60 / 60 / 24 : 0
    const start = daysLeft > 0 ? 240 - 300 * daysLeft / days : full

    return (
        <View style={{
            width: wrapSize,
            // justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10
        }}>
            <View style={{height: headerHeight, width: '100%', justifyContent: 'center'}}>
                <AppText text={name} color={THEME[theme].title}/>
            </View>

            <Svg width={size+strokeWidth/2} height={size + strokeWidth}>

                <View style={{
                    width: size, height: size + strokeWidth, alignItems: 'center', justifyContent: 'center',
                    // backgroundColor: 'green'
                    backgroundColor: THEME.color.transparent
                }}>
                    <MaterialCommunityIcons name='calendar-blank' size={size*0.7} color={daysLeft>0?THEME[theme].plan:THEME[theme].warning}/>
                </View>

                <Circle r={size / 2 - strokeWidth/2} x={size / 2} y={size / 2}
                        fill='none' strokeWidth={strokeWidth} stroke={daysLeft>0?inactive:THEME[theme].warning}/>

                {daysLeft>0
                    ? arc(start, full, size / 2 - strokeWidth / 2, strokeWidth, THEME[theme].plan)
                    : null
                }

            </Svg>

            <View style={{width: size, height: size/4, minHeight: 10, position: 'absolute', top: headerHeight+size-strokeWidth*1.5,
                backgroundColor: daysLeft>0?THEME[theme].plan:THEME[theme].warning,
                justifyContent: 'center',
                // backgroundColor: THEME.color.transparent2,
                borderRadius: size/4,
            }}>
                <AppText text={numToString(sum)} color={THEME[theme].main} otherStyle={{padding: 0}}/>
            </View>

            <View style={{position: 'absolute', top: headerHeight + size / 2 - strokeWidth}}>
                <AppText text={daysLeft} fontSize={size / 4} otherStyle={{padding: 0}}
                         // color={daysLeft>0?THEME[theme].plan:THEME[theme].warning}
                         color={theme==='dark'?THEME[theme].title:daysLeft>0?THEME[theme].plan:THEME[theme].warning}
                />
            </View>

        </View>
    )
}
