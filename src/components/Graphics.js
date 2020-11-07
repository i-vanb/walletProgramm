import React from 'react'
import {View, Dimensions} from 'react-native'
import Svg, {Circle, Path, Text, Rect} from 'react-native-svg'
import {THEME} from "../theme";


const degToRad = (deg) => {
    const rad = deg / (180 / Math.PI)
    return Math.round(rad * 10000) / 10000
}

export const Graphics = ({categories, totalSum, totalIncomeSum, totalExpenseSum, saved, left, highlightedElement, isDetail, theme}) => {
    const {width} = Dimensions.get('window')
    const radius = width / 4
    let angle = 0
    // console.log(categories.filter(category => category.fact > 0))

    if (isDetail) {
        return (
            <Svg width={width / 2} height={width / 2}>
                {categories.filter(category => category.fact > 0).map((category, index) => {

                    const startAngle = angle
                    angle += 360 * category.fact / totalSum

                    const x1 = radius * Math.cos(degToRad(startAngle)) + radius
                    const y1 = radius - radius * Math.sin(degToRad(startAngle))
                    const x2 = radius * Math.cos(degToRad(angle)) + radius
                    const y2 = radius - radius * Math.sin(degToRad(angle))

                    if (highlightedElement) {
                        const color = highlightedElement === category.id
                            ? THEME.colorBars[index + 1]
                            : THEME.light.empty

                        return (
                            <Path
                                key={category.id}
                                d={`M ${x1} ${y1} A ${radius} ${radius} 0 
                            ${angle - startAngle > 180 ? 1 : 0} 0 ${x2} ${y2} L ${radius} ${radius}`}
                                stroke={THEME[theme].back}
                                fill={color}
                            />
                        )
                    } else {
                        return (
                            <Path
                                key={category.id}
                                d={`M ${x1} ${y1} A ${radius} ${radius} 0 
                            ${angle - startAngle > 180 ? 1 : 0} 0 ${x2} ${y2} L ${radius} ${radius}`}
                                stroke={THEME[theme].back}
                                fill={THEME.colorBars[index + 1]}
                            />
                        )
                    }
                })}

                <Path
                    d={
                        `M ${radius * Math.cos(degToRad(angle)) + radius} ${radius - radius * Math.sin(degToRad(angle))} 
                    A ${radius} ${radius} 0 ${angle < 180 ? 1 : 0} 0 
                     ${radius * Math.cos(degToRad(0)) + radius} 
                     ${radius - radius * Math.sin(degToRad(0))} L ${radius} ${radius}
                    `}
                    stroke={THEME[theme].back}
                    fill={THEME.colorBars[0]}
                />
            </Svg>
        )
    } else {
        const fullLength = Math.max(totalIncomeSum, totalExpenseSum, left, saved)

        const size = (width/2)/7

        let lengthExpense = totalExpenseSum * (width/2) / fullLength
        let lengthIncome = totalIncomeSum * (width/2) / fullLength
        let lengthSaved = saved * (width/2) / fullLength
        let lengthLeft = left * (width/2) / fullLength

        return (
            <Svg width={width / 2} height={width / 2}>
                <Rect x={0} y={width/2-lengthLeft} width={size} height={lengthLeft} fill={THEME[theme].inactive}/>
                <Rect x={size*2} y={width/2-lengthIncome} width={size} height={lengthIncome} fill={THEME[theme].income}/>
                <Rect x={size*4} y={width/2-lengthExpense} width={size} height={lengthExpense} fill={THEME[theme].expense}/>
                <Rect x={size*6} y={width/2-lengthSaved} width={size} height={lengthSaved} fill={THEME[theme].plan}/>
            </Svg>
            )
    }
}
