import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {loadProfile} from "../store/actions/profile";
import {THEME} from "../theme";
import {getCurrentData, loadExpenses, loadIncomes, loadPeriods, makeExpense, makeIncome} from "../store/actions/period";
import {Welcome} from "../components/Welcome";
import {AppButton} from "../components/ui/AppButton";
import {AddExpense} from "../components/AddExpense";
import {ExpenseItem} from "../components/ExpenseItem";
import {IncomeItem} from "../components/IncomeItem";
import {AddIncome} from "../components/AddIncome";
import {numToString} from "../utilities/numToString";

export const HomeScreen = () => {
    const [isAddExpense, setIsAddExpense] = useState(false)
    const [isAddIncome, setIsAddIncome] = useState(false)

    const dateToString = (dateMS) => {
        const strDate = new Date(dateMS)
        const year = strDate.getFullYear()
        const month = strDate.getMonth()
        const date = strDate.getDate()
        return `${date}.${month===11 ? 12 : month+1}.${year}`
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProfile())
        dispatch(getCurrentData())
    }, [])

    const profile = useSelector(state => state.profile.user)
    const loading = useSelector(state => state.profile.loading)
    const state = useSelector(state => state.period)
    let totalIncome = 0
    let totalExpense = 0

    // console.log('state', state)

    if (loading || !state.periods.length) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.color.warm}/>
            </View>
        )
    }

    if (!profile.name) {
        return <Welcome />
    }

    const addExpenseHandler = (category, name, sum) => {
        dispatch(makeExpense(state.periods[0].name, category, name, sum))
        dispatch(getCurrentData())
        setIsAddExpense(false)
    }

    const addIncomeHandler = (name, sum, time) => {
        dispatch(makeIncome(state.periods[0].name, name, sum, time))
        dispatch(getCurrentData())
        setIsAddIncome(false)
    }

    state.expenses[state.periods[0].name].map(item => totalExpense=totalExpense+item.sum)
    state.incomes[state.periods[0].name].map(item => totalIncome=totalIncome+item.sum)

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollWrap}>
                <AddExpense
                    visible={isAddExpense}
                    onSave={addExpenseHandler}
                    onCancel={() => setIsAddExpense(false)}/>

                <AddIncome
                    visible={isAddIncome}
                    onSave={addIncomeHandler}
                    onCancel={()=>setIsAddIncome(false)}
                />

                <View style={styles.header}>
                    <View style={styles.headerLeft}></View>
                    <Text style={styles.headerTitle}>Incomes in {state.periods[0].name}</Text>
                    <Text style={styles.headerRight}>{numToString(totalIncome)}</Text>
                </View>
                <View style={styles.subHeader}>
                    <Text style={styles.subHeaderText}>Date</Text>
                    <Text style={styles.subHeaderText}>Name</Text>
                    <Text style={styles.subHeaderText}>Sum</Text>
                </View>
                <View style={styles.list}>{state.incomes[state.periods[0].name].map(income =>
                    <IncomeItem
                        key={income.id}
                        id={income.id}
                        title={income.name}
                        sum={numToString(income.sum)}
                        date={dateToString(income.date)}
                        // onRemove
                        onOpen={()=>{

                        }}
                    />
                )}</View>

                <View style={styles.btn}>
                    <AppButton
                        onPress={() => setIsAddIncome(true)}
                        title='Add income'
                    />
                </View>

                <View style={styles.header}>
                    <View style={styles.headerLeft}></View>
                    <Text style={styles.headerTitle}>Expenses in {state.periods[0].name}</Text>
                    <Text style={styles.headerRight}>{numToString(totalExpense)}</Text>
                </View>
                <View style={styles.subHeader}>
                    <Text style={styles.subHeaderText}>Category</Text>
                    <Text style={styles.subHeaderText}>Name</Text>
                    <Text style={styles.subHeaderText}>Sum</Text>
                </View>
                <View style={styles.list}>{state.expenses[state.periods[0].name].map(expense =>
                        <ExpenseItem
                            key={expense.id}
                            id={expense.id}
                            title={expense.name}
                            category={expense.category}
                            sum={numToString(expense.sum)}
                            // date={}
                            // onRemove
                            // onOpen
                        />
                )}</View>

                <View style={styles.btn}>
                    <AppButton
                        onPress={() => setIsAddExpense(true)}
                        title='Add expense'
                    />
                </View>


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: THEME.color.dark
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        fontFamily: 'bitter-regular',
        textAlign: 'center',
        fontSize: 18,
        color: THEME.color.light,
    },
    headerTotal: {
        fontFamily: 'bitter-regular',
        textAlign: 'center',
        fontSize: 18,
        color: THEME.color.light,
        padding: 5
    },
    headerTitle: {
        flex: 3,
        alignItems: 'center',
        fontFamily: 'bitter-regular',
        fontSize: 20,
        textAlign: 'center',
        color: THEME.color.light
    },
    subHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.color.dark
    },
    subHeaderText: {
        flex: 1,
        color: THEME.color.light,
        fontFamily: 'bitter-regular',
        textAlign: 'center',
        fontSize: 16
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.color.light
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.color.light
    },
    scrollWrap: {
        width: '100%',
        padding: 1
    },
    incomes: {},

    list: {
        padding: 10
    },
    items: {
        fontFamily: 'bitter-regular',
        fontSize: 15,
        color: THEME.color.dark
    },
    btn: {
        alignItems: 'center',
        paddingBottom: 10
    }
})
