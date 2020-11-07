import React, {useState} from 'react'
import {View, Dimensions, TouchableWithoutFeedback} from 'react-native'
import Svg, {Circle, Path, Text, Rect, Line} from 'react-native-svg'
import {AntDesign, MaterialCommunityIcons, SimpleLineIcons} from '@expo/vector-icons';

import {capitalizeFirstLetter} from "../utilities/capitalizeFirstLetter";
import {THEME} from "../theme";
import {AppText} from "../components/ui/AppText";
import {lang} from "../utilities/lang";
import {getUniqueKey} from "../utilities/getUniqueKey";
import {numToString} from "../utilities/numToString";

const slicedPeriodName = name => {
    let month = name.slice(0, name.indexOf('_'))
    let year = name.slice(name.indexOf('_') + 1)
    month = capitalizeFirstLetter(month)
    return {month, year}
}

const testParams = {
    incomes: [88000, 93000, 76000, 53000, 109000, 78000, 89000, 98000],
    expenses: [76000, 79000, 73000, 71000, 82000, 74000, 76000, 86000],
    saved: [12000, 26000, 29000, 11000, 38000, 42000, 55000, 77000],
    biggestNumber: 109000,
    period: [{name: 'january_2020'}, {name: 'february_2020'}, {name: 'march_2020'}, {name: 'april_2020'},
        {name: 'may_2020'}, {name: 'june_2020'}, {name: 'july_2020'}, {name: 'august_2020'}]
}

export const AllTimeGraphicScreen = ({navigation, route}) => {

    const {
        period, incomes, expenses, saved, biggestNumber, totals, theme, language
    } = route.params

    const {height, width} = Dimensions.get('window')
    const svgH = height * 0.5
    const frame = 50
    const fullHeight = biggestNumber * svgH / biggestNumber

    const [detailed, setDetailed] = useState(0)

    const getCoordY = (number) => {
        let numberSvg = number * (svgH - frame * 2) / biggestNumber
        let coord = fullHeight - numberSvg - frame
        return coord
    }

    const getCoordX = (index, length) => {
        return (width - frame * 2) / (length - 1) * index + frame
    }

    const getPathGraphic = (array) => {
        let str = ''
        array.map((number, index) => {
            const x = getCoordX(index, array.length)
            const y = getCoordY(number)
            if (index > 0) {
                str = str.concat(' L ' + x + ' ' + y)
            } else {
                str = str.concat(' M ' + x + ' ' + y)
            }
        })
        return str
    }

    navigation.setOptions({
        title: lang('All time', language),
        headerTitleStyle: {
            color: THEME[theme].title,
        },
        headerStyle: {
            backgroundColor: THEME[theme].main,
        },
        headerLeft: () => <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                         <View style={{paddingLeft: 10}}>
                             <AntDesign name="caretleft" size={24} color={THEME[theme].title}/>
                         </View>
                     </TouchableWithoutFeedback>,
    })

    const step = (svgH - (frame * 2)) / 10
    const scaleValue = biggestNumber / 10
    return (
        <View style={{backgroundColor: THEME[theme].back, flex: 1}}>
            <Svg width={width} height={svgH} style={{
                backgroundColor: 'gray',
                alignSelf: 'center'
            }}>
                {/*<Line x1={frame} y1={0} x2={frame} y2={svgH - frame} stroke='silver' strokeWidth={.2}/>*/}
                {/*<Line x1={width-frame} y1={0} x2={width-frame} y2={svgH - frame} stroke='silver' strokeWidth={.2}/>*/}

                <Line x1={0} y1={svgH - frame} x2='100%' y2={svgH - frame} stroke='silver' strokeWidth={2}/>
                <Text x={5} y={svgH - frame - 5}> 0 </Text>

                <Line x1={0} y1={frame} x2='100%' y2={frame} stroke='silver' strokeWidth={2}/>
                <Text x={5} y={frame - 5}> {numToString(biggestNumber).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step} x2='100%' y2={frame + step} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step - 5}> {numToString(scaleValue * 9).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step * 2} x2='100%' y2={frame + step * 2} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 2 - 5}> {numToString(scaleValue * 8).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step * 3} x2='100%' y2={frame + step * 3} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 3 - 5}> {numToString(scaleValue * 7).slice(0, -3) + 'k'} </Text>


                <Line x1={0} y1={frame + step * 4} x2='100%' y2={frame + step * 4} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 4 - 5}> {numToString(scaleValue * 6).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step * 5} x2='100%' y2={frame + step * 5} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 5 - 5}> {numToString(scaleValue * 5).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step * 6} x2='100%' y2={frame + step * 6} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 6 - 5}> {numToString(scaleValue * 4).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step * 7} x2='100%' y2={frame + step * 7} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 7 - 5}> {numToString(scaleValue * 3).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step * 8} x2='100%' y2={frame + step * 8} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 8 - 5}> {numToString(scaleValue*2).slice(0, -3) + 'k'} </Text>

                <Line x1={0} y1={frame + step * 9} x2='100%' y2={frame + step * 9} stroke='silver' strokeWidth={.2}/>
                <Text x={5} y={frame + step * 9 - 5}> {numToString(scaleValue).slice(0, -3) + 'k'} </Text>


                {incomes.map((number, index) =>
                    <View key={getUniqueKey()}>
                        <Circle
                              cx={getCoordX(index, incomes.length)}
                              cy={getCoordY(number)} r={3}
                              fill={detailed === 0 || detailed === 1 ? THEME[theme].income : THEME[theme].shaded}/>
                        <Line x1={getCoordX(index, incomes.length)} y1={0} x2={getCoordX(index, incomes.length)} y2={svgH - frame} stroke='silver'
                              strokeWidth={.2}/>
                        <Text
                              x={getCoordX(index, incomes.length)+5}
                              y={frame/1.5}>
                            {period[index].name.slice(0, 3)}
                        </Text>

                        <Text
                              x={getCoordX(index, incomes.length)+5}
                              y={frame-5}>
                            {period[index].name.slice(-2)}
                        </Text>
                    </View>
                )}
                {expenses.map((number, index) => <Circle key={getUniqueKey()} cx={getCoordX(index, expenses.length)}
                                                         cy={getCoordY(number)} r={3}
                                                         fill={detailed === 0 || detailed === 2 ? THEME[theme].expense : THEME[theme].shaded}/>)}
                {saved.map((number, index) => <Circle key={getUniqueKey()} cx={getCoordX(index, saved.length)}
                                                      cy={getCoordY(number)} r={3}
                                                      fill={detailed === 0 || detailed === 3 ? THEME[theme].plan : THEME[theme].shaded}/>)}

                <Path d={getPathGraphic(incomes)}
                      stroke={detailed === 0 || detailed === 1 ? THEME[theme].income : THEME[theme].shaded}
                      strokeWidth={2} fill='none'/>
                <Path d={getPathGraphic(expenses)}
                      stroke={detailed === 0 || detailed === 2 ? THEME[theme].expense : THEME[theme].shaded}
                      strokeWidth={2} fill='none'/>
                <Path d={getPathGraphic(saved)}
                      stroke={detailed === 0 || detailed === 3 ? THEME[theme].plan : THEME[theme].shaded}
                      strokeWidth={2} fill='none' />
            </Svg>

            <View style={{padding: 10}}>

                <TouchableWithoutFeedback
                    onPress={() => {
                        if (detailed === 1) {
                            setDetailed(0)
                        } else {
                            setDetailed(1)
                        }
                    }}
                >
                    <View style={{flexDirection: 'row'}}>
                        <SimpleLineIcons name="graph" size={24} color={THEME[theme].income}/>
                        <AppText text={lang('Earned in month', language)}
                                 color={detailed === 1 ? THEME[theme].income : THEME[theme].empty}
                                 otherStyle={{marginLeft: 15}}/>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => {
                        if (detailed === 2) {
                            setDetailed(0)
                        } else {
                            setDetailed(2)
                        }
                    }}
                >
                    <View style={{flexDirection: 'row'}}>
                        <SimpleLineIcons name="graph" size={24} color={THEME[theme].expense}/>
                        <AppText text={lang('Spent in month', language)}
                                 color={detailed === 2 ? THEME[theme].expense : THEME[theme].empty}
                                 otherStyle={{marginLeft: 15}}/>
                    </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback
                    onPress={() => {
                        if (detailed === 3) {
                            setDetailed(0)
                        } else {
                            setDetailed(3)
                        }
                    }}
                >
                    <View style={{flexDirection: 'row'}}>
                        <SimpleLineIcons name="graph" size={24} color={THEME[theme].plan}/>
                        <AppText text={lang('Saved in month', language)}
                                 color={detailed === 3 ? THEME[theme].plan : THEME[theme].empty}
                                 otherStyle={{marginLeft: 15}}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
