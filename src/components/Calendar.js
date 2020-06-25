import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native'
import {AppButton} from "./ui/AppButton";
import {THEME} from "../theme";

import {AntDesign} from '@expo/vector-icons';

const getMonth = month => {
    let arr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    return arr[month]
}

const getFirstDayInMonth = (iYear, iMonth) => {
    return new Date(iYear, iMonth).getDay()
}


const PREV = 'prev'
const CURRENT = 'current'
const NEXT = 'next'

export const Calendar = props => {
    const currentDate = new Date()
    const today = currentDate.getDate()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const firstDayCurrentMonth = getFirstDayInMonth(currentYear, currentMonth)
    let calendarObject = {prevMonth: [], currentMonth: [], nextMonth: []}
    const [calendarMonthShown, setCalendarMonthShown] = useState(CURRENT)

    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const firstDayPrevMonth = getFirstDayInMonth(prevYear, prevMonth)
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const firstDayNextMonth = getFirstDayInMonth(nextYear, nextMonth)

    const setTitleMonth = (state, prevMonth, currentMonth, nextMonth) => {
        switch (state) {
            case PREV:
                return prevMonth
            case CURRENT:
                return currentMonth
            case NEXT:
                return nextMonth
            default:
                console.log('fault in setTitleMonth')
        }
    }

    const getMonthArray = state => {
        switch (state) {
            case PREV:
                return calendarObject.prevMonth
            case CURRENT:
                return calendarObject.currentMonth
            case NEXT:
                return calendarObject.nextMonth
            default:
                console.log('fault in setTitleMonth')
        }
    }

    const calendarHandler = (direction, state) => {
        switch (direction) {
            case PREV:
                if (state === CURRENT) setCalendarMonthShown(PREV)
                if (state === NEXT) setCalendarMonthShown(CURRENT)
                break
            case NEXT:
                if (state === CURRENT) setCalendarMonthShown(NEXT)
                if (state === PREV) setCalendarMonthShown(CURRENT)
                break
            default:
                console.log('Something is going wrong')
        }
    }


    const setCalendar = (year, iMonth, firstDay, array, today=0) => {
        let firstDayOfWeek = firstDay || 7
        let month = iMonth + 1
        let number = 0
        let key = 0
        let days = 32 - new Date(year, iMonth, 32).getDate()
        for (let w = 1; w <= 6; w++) {
            for (let d = 1; d <= 7; d++) {
                key += 1
                if (firstDayOfWeek === d && !number) {
                    array.push({
                        key, number: 1, year, month, iMonth, weekDay: d, week: w, isAvailable: 1 > today
                    })
                    number = 1
                } else if (number > 0 && number < days) {
                    number += 1
                    array.push({
                        key, number, year, month, iMonth, weekDay: d, week: w, isAvailable: number > today
                    })
                } else {
                    array.push({key, number: 0, year, month, iMonth, weekDay: d, week: w})
                }
            }
        }
    }

    setCalendar(currentYear, currentMonth, firstDayCurrentMonth, calendarObject.currentMonth)
    setCalendar(prevYear, prevMonth, firstDayPrevMonth, calendarObject.prevMonth, today)
    setCalendar(nextYear, nextMonth, firstDayNextMonth, calendarObject.nextMonth)

    const pickDateHandler = (day, month, year, iMonth) => {
        props.setDate(day)
        props.setMonth(month)
        props.setYear(year)
        props.setIndexMonth(iMonth)
        props.onBack()
    }

    return (
        <>
            <View style={styles.calendarHeader}>
                <AppButton color={THEME.color.light}
                           title={<AntDesign name="leftcircleo" size={24} color="black"/>}
                           disabled={calendarMonthShown === PREV}
                           onPress={() => {
                               calendarHandler(PREV, calendarMonthShown)
                           }}/>
                <Text
                    style={styles.title}>{getMonth(setTitleMonth(calendarMonthShown, prevMonth, currentMonth, nextMonth))}</Text>
                <AppButton color={THEME.color.light}
                           title={<AntDesign name="rightcircleo" size={24} color="black"/>}
                           disabled={calendarMonthShown === NEXT}
                           onPress={() => {
                               calendarHandler(NEXT, calendarMonthShown)
                           }}/>
            </View>
            <View style={styles.container}>
                {getMonthArray(calendarMonthShown).map(day => {
                        if (day.number && day.isAvailable) {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => pickDateHandler(day.number, day.month, day.year, day.iMonth)} key={day.key}>
                                    <View style={styles.button}><Text>{day.number}</Text></View>
                                </TouchableWithoutFeedback>
                            )
                        } else if (day.number && !day.isAvailable) {
                            return (
                                <View key={day.key} style={styles.buttonNotAvailable}>
                                    <Text>{day.number}</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View key={day.key} style={styles.empty}/>
                            )
                        }
                    })
                }
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    button: {
        // flex: 1,
        // alignContent: "space-around",
        height: 30,
        width: `${100 / 7}%`,
        backgroundColor: THEME.color.smooth,
        borderStyle: 'solid',
        borderColor: THEME.color.dark,
        borderWidth: 1
    },
    buttonNotAvailable: {
        height: 30,
        width: `${100 / 7}%`,
        backgroundColor: THEME.color.light,
        borderStyle: 'solid',
        borderColor: THEME.color.dark,
        borderWidth: 1
    },
    next: {
        backgroundColor: THEME.color.light
    },
    calendarHeader: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-around',
        paddingBottom: 5
    },
    title: {
        fontFamily: 'bitter-regular',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 10,
        color: THEME.color.warm
    },
    empty: {
        height: 30,
        width: `${100 / 7}%`,
        // backgroundColor: THEME.color.cold,
        // borderStyle: 'solid',
        // borderColor: THEME.color.dark,
        // borderWidth: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: 'center'
        width: '70%',

    },
    sq: {}
})

