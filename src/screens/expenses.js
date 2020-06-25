import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useSelector} from "react-redux";
import {THEME} from "../theme";
import {numToString} from "../utilities/numToString";

export const ExpensesScreen = () => {
    const state = useSelector(state => state.period)
    const month = state.periods[0].name
    let home = 0
    let food = 0
    let car = 0
    let service = 0
    let credit = 0
    let fun = 0
    let others = {}
    let income = 0
    state.incomes[month].map(inc => income += inc.sum)

    state.expenses[month].map(expense => {
        switch (expense.category) {
            case 'food': food += expense.sum
                break
            case 'home': home += expense.sum
                break
            case 'car': car += expense.sum
                break
            case 'service': service += expense.sum
                break
            case 'credit': credit += expense.sum
                break
            case 'fun': fun += expense.sum
                break
            default: others = {...others, [expense.category]: expense.sum}
        }
    })

    console.log('home:', home)
    console.log('food:', food)
    console.log('car:', car)
    console.log('service:', service)
    console.log('credit:', credit)
    console.log('fun:', fun)
    console.log('others:', others)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Report for {month}</Text>
                <Text style={styles.title}>Currently you've spent money on</Text>
            </View>
            <View style={styles.item}><Text style={styles.itemText}>Home: {numToString(home)}</Text></View>
            <View style={styles.item}><Text style={styles.itemText}>Food: {numToString(food)}</Text></View>
            <View style={styles.item}><Text style={styles.itemText}>Car: {numToString(car)}</Text></View>
            <View style={styles.item}><Text style={styles.itemText}>Credit: {numToString(credit)}</Text></View>
            <View style={styles.item}><Text style={styles.itemText}>Service: {numToString(service)}</Text></View>
            <View style={styles.item}><Text style={styles.itemText}>Fun: {numToString(fun)}</Text></View>
            <View style={styles.total}>
                <Text style={styles.totalText}>
                    {numToString(home+fun+car+credit+service+food)} / {numToString(income)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.color.light,
    },
    header: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: THEME.color.dark
    },
    title: {
        color: THEME.color.light,
        fontFamily: 'bitter-regular',
        fontSize: 20,
    },
    itemText: {
        color: THEME.color.dark,
        fontFamily: 'bitter-regular',
        fontSize: 18,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: THEME.color.light,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: THEME.color.smooth,
    },
    total: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: THEME.color.warm,
        borderRadius: 5,
        backgroundColor: THEME.color.warm,
    },
    totalText: {
        color: THEME.color.light,
        fontFamily: 'bitter-regular',
        fontSize: 20,
    }

})
