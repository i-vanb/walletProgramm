import React from 'react'
import {View, Dimensions} from 'react-native'
import Svg, {Circle, Path, Text} from 'react-native-svg'
import {AppText} from "./ui/AppText";
import {THEME} from "../theme";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {numToString} from "../utilities/numToString";

const {width} = Dimensions.get('window')
const wrapSize = width / 4
const size = wrapSize / 1.3
const strokeWidth = size / 15
const radius = (size - strokeWidth) / 2
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
        }
    }

    return (
        <Path d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${renderPart()} 1 ${x2} ${y2}`}
              stroke={color}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap='round'
        />
    )
}


export const Card = ({name, icon, plan, fact, theme}) => {
    const colorFull = () => {
        if (fact > plan) {
            return THEME[theme].warning
        } else if (plan === 0) {
            return THEME[theme].empty
        } else {
            return THEME[theme].expense
        }
    }
    const zero = 300
    const full = -15

    const factFull = () => {
        if (fact > plan || plan === 0) {
            return full
        } else {
            const l = 315 * fact / plan
            return 300 - Math.round(l)
        }
    }

    return (
        <View style={{
            width: wrapSize,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            // height: 1
        }}>
            <View style={{height: headerHeight}}><AppText text={name} color={THEME[theme].title}/></View>
            <Svg width={size} height={size*1.1}>
                {/*<Circle r={radius} x={radius+strokeWidth/2} y={radius+strokeWidth/2} fill={THEME[theme].back} />*/}
                <Circle r={radius*0.7} x={radius+strokeWidth/2} y={radius+strokeWidth/2} fill={colorFull()} />
                {arc(zero, full, radius, strokeWidth, THEME[theme].empty)}
                {fact > 0 && arc(zero, factFull(), radius, strokeWidth, colorFull())}
                <View style={{
                    alignItems: 'center',
                    paddingTop: radius / 2,
                    backgroundColor: 'rgba(255,255,255,0)'
                }}>
                    <MaterialCommunityIcons name={icon} size={radius} color={THEME[theme].back}/>
                </View>
                {plan === 0 &&
                <Text x={size - strokeWidth * 3} y={size - strokeWidth * 2} fill={THEME[theme].empty}
                      fontSize={strokeWidth * 4} fontWeight='bold'>0</Text>
                }
            </Svg>
            <View style={{
                position: 'absolute',
                left: wrapSize / 3 + strokeWidth,
                top: headerHeight + size / 2 + radius / 3,
                backgroundColor: colorFull(),
                borderRadius: 5,
                paddingHorizontal: 5
            }}>
                {plan !== 0 &&
                <AppText text={numToString(plan)} color={THEME[theme].back} fontSize={strokeWidth * 3}
                         otherStyle={{padding: 0}}/>
                }
            </View>
            <AppText text={fact} color={THEME[theme].title} otherStyle={{padding: 0}}/>
        </View>
    )
}
