import React, {useState} from 'react'
import {
    View,
    StyleSheet,
    Picker
} from 'react-native'
import {THEME} from "../theme"
import {getUniqueKey} from "../utilities/getUniqueKey"
import {getMonthName} from "../utilities/getMonthName"
import {AppButton} from "./ui/AppButton";
import {lang} from "../utilities/lang";


export const Calendar = ({calendar, saveDateHandler, currentDate, language}) => {
    const [year, setYear] = useState(currentDate>0 ? new Date(currentDate).getFullYear().toString() : Object.keys(calendar)[0])
    const [month, setMonth] = useState(currentDate>0 ? new Date(currentDate).getMonth().toString() : Object.keys(calendar[year])[0])
    const [date, setDate] = useState(currentDate>0 ? new Date(currentDate).getDate().toString() : calendar[year][month][0])

    return (
        <>
        <View style={{flexDirection: 'row'}}>
            <Picker
                // mode='dropdown'
                selectedValue={date}
                style={{flex: 1}}
                itemStyle={{
                    color: THEME.color.dark,
                    fontFamily: 'bitter-regular',
                    fontSize: 18
                }}
                onValueChange={(itemValue, itemIndex) => {
                    setDate(itemValue)
                }}>
                {calendar[year][month].map(i => {
                    return <Picker.Item label={i} value={i} key={getUniqueKey()}/>
                })}
            </Picker>
            <Picker
                // mode='dropdown'
                selectedValue={month}
                style={{flex: 1}}
                itemStyle={{
                    color: THEME.color.dark,
                    fontFamily: 'bitter-regular',
                    fontSize: 18
                }}
                onValueChange={(itemValue, itemIndex) => {
                    setDate(calendar[year][itemValue][0])
                    setMonth(itemValue)
                }}>
                {Object.keys(calendar[year]).map(month =>
                    <Picker.Item label={lang(getMonthName(month), language)} value={month} key={getUniqueKey()}/>
                )}
            </Picker>
            <Picker
                // mode='dropdown'
                selectedValue={year}
                style={{flex: 1}}
                itemStyle={{
                    color: THEME.color.dark,
                    fontFamily: 'bitter-regular',
                    fontSize: 18
                }}
                onValueChange={(itemValue, itemIndex) => {
                    setDate(calendar[itemValue][month][0])
                    setMonth(Object.keys(calendar[itemValue])[0])
                    setYear(itemValue)
                }}>
                {Object.keys(calendar).map(year =>
                    <Picker.Item label={year} value={year} key={getUniqueKey()}/>
                )}
            </Picker>
        </View>
            <View>
                <AppButton
                    title={lang('submit', language)}
                    color={THEME.color.yellow}
                    textStyle={{color: THEME.color.dark}}
                    onPress={() => saveDateHandler(year, month, date)}
                />
            </View>
            </>
    )
}
