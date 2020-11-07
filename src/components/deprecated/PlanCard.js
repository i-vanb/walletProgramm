import React from 'react'
import {View, Dimensions} from 'react-native'
import Svg, {Circle} from 'react-native-svg'
import {AppText} from "../ui/AppText"
import {THEME} from "../../theme"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {numToString} from "../../utilities/numToString"
import {dateToStringMD} from "../../utilities/dateToString";

const {width} = Dimensions.get('window')
const wrapSize = width / 5
const size = wrapSize / 1.5
const strokeWidth = size / 15
const radius = (size - strokeWidth) / 2
const headerHeight = 20

export const PlanCard = ({name, sum, date, theme}) => {
    if(date > 0) {
        return (
            <View style={{
                width: wrapSize,
                // justifyContent: 'center',
                alignItems: 'center',
                // marginBottom: 10
            }}>
                <View style={{height: headerHeight}}><AppText text={name} color={THEME[theme].title}
                                                              otherStyle={{padding: 0}}/>
                </View>

                <Svg width={size} height={size} style={{marginBottom: 5}}>
                     <Circle r={radius+strokeWidth/2} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                            fill={THEME[theme].plan}/>
                    <View style={{
                        alignItems: 'center',
                        paddingTop: radius / 2 + strokeWidth / 2,
                        backgroundColor: 'rgba(255,255,255,0)'
                    }}>
                        <MaterialCommunityIcons name='calendar-clock' size={radius} color={THEME[theme].back}/>
                    </View>
                </Svg>

                <View style={{
                    // position: 'absolute',
                    // bottom: headerHeight + strokeWidth / 2,
                    backgroundColor: THEME[theme].plan,
                    borderRadius: 10,
                    paddingHorizontal: 10
                }}>
                    <AppText text={numToString(sum)}
                             color={THEME[theme].back}
                             fontSize={14}
                             otherStyle={{padding: 0}}/>

                </View>
                <AppText text={dateToStringMD(date)} otherStyle={{padding: 0}} color={THEME[theme].title}/>

            </View>
        )
    }
    return (
        <View style={{
            width: wrapSize,
            // justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 10
        }}>
            <View style={{height: headerHeight}}><AppText text={name} color={THEME[theme].title}
                                                          otherStyle={{padding: 0}}/>
            </View>

            <Svg width={size} height={size} style={{marginBottom: 5}}>
                <Circle r={radius+strokeWidth/2} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2}
                        fill={THEME[theme].plan}/>
                <View style={{
                    alignItems: 'center',
                    paddingTop: radius / 2 + strokeWidth / 2,
                    backgroundColor: 'rgba(255,255,255,0)'
                }}>
                    <MaterialCommunityIcons name='calendar-blank' size={radius} color={THEME[theme].back}/>
                </View>
            </Svg>

            <View style={{
                backgroundColor: THEME[theme].plan,
                borderRadius: 10,
                paddingHorizontal: 10
            }}>
                <AppText text={numToString(sum)}
                         color={THEME[theme].back}
                         fontSize={14}
                         otherStyle={{padding: 0}}/>

            </View>
        </View>
    )
}
