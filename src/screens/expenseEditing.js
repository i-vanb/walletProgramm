import React, {useState} from 'react'

import {View, Text, StyleSheet, TextInput, Picker, Alert, TouchableWithoutFeedback,
    Keyboard, KeyboardAvoidingView} from 'react-native'
import {THEME} from '../theme'
import {inputNumberHandler} from "../utilities/inputNumberHandler"
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";
import {useDispatch, useSelector} from "react-redux";
import {getTodayInMS} from "../utilities/getTodayInMS";
import {
    addExpense,
    changeExpenseCategory,
    changeExpenseName,
    changeExpenseSum,
    deleteExpense
} from "../store/actions/expense";
import {changeWalletSum} from "../store/actions/wallet";
import {changeCurrentCategoryFact, changeCurrentCategoryPlan} from "../store/actions/current";
import {lang} from "../utilities/lang";
import {getReportIncomes, getReportPeriod} from "../store/actions/report";

export const ExpenseEditingScreen = ({navigation, route}) => {
    const dispatch = useDispatch()
    console.log(route.params.period)
    const [category, setCategory] = useState(route.params.expense ? route.params.expense.category : route.params.category ? route.params.category : route.params.categories[0].name)
    const [name, setName] = useState(route.params.expense ? route.params.expense.name : '')
    const [sum, setSum] = useState(route.params.expense ? route.params.expense.sum : '')

    const settings = useSelector(state => state.settings)
    const plans = useSelector(state => state.plan)

    const {language, theme} = settings

    const sumPlan = () => {
        let sumPlan = 0
        plans.map(p => {
            if (p.category === category) {
                sumPlan += p.sum
            }
        })
        return sumPlan
    }


    navigation.setOptions({
        headerStyle: {
            backgroundColor: THEME.color.dark
        },
        headerLeft: () => {
        },
        // <MaterialCommunityIcons name="credit-card-minus-outline" size={30}
        //                         color={THEME.color.green} style={{paddingLeft: 20}}/>,
        headerTitle: () =>
            <View>
                <Text style={{
                    fontFamily: 'bitter-regular',
                    fontSize: 18,
                    color: THEME.light.expense,
                    textAlign: 'right'
                }}>{lang('Expense Editor', language)}</Text>
            </View>
    })


    const categoryName =
        <Picker
            // mode='dropdown'
            selectedValue={category}
            style={styles.picker}
            itemStyle={{
                color: THEME.color.dark,
                fontFamily: 'bitter-regular',
                fontSize: 18
            }}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
            {route.params.categories.map(category => {
                return <Picker.Item label={lang(category.name, language)} value={category.name} key={category.id}/>
            })}
        </Picker>


    const cancelHandler = () => {
        navigation.goBack()
    }

    const removeHandler = () => {
        Alert.alert(
            lang('Removing expense', language),
            lang('Do you really want to remove the expense?', language),
            [
                {
                    text: lang('Cancel', language),
                    style: 'cancel'
                },
                {
                    text: lang('remove', language), style: 'destructive', onPress: () => {
                        // const changedSum = route.params.sum < 0 ? route.params.sum + route.params.expense.sum : route.params.sum - route.params.expense.sum
                        dispatch(deleteExpense(route.params.expense.id))
                        dispatch(changeWalletSum(route.params.sum + route.params.expense.sum))
                        route.params.categories.map(c => {
                            if (c.name === route.params.expense.category) {
                                dispatch(changeCurrentCategoryFact(route.params.period, c.id, c.fact - route.params.expense.sum))
                            }
                        })
                        dispatch(getReportPeriod(route.params.period))
                        navigation.goBack()
                    }
                }
            ],
            {cancelable: false}
        )
    }

    const saveHandler = () => {
        if (route.params.sum - sum < 0) {
            return Alert.alert(lang('You are trying to spend more then you have!', language), lang(`Check your balance!`, language))
        }
        if (name.trim().length < 3) {
            return Alert.alert(lang('Error!', language), lang(`Minimum three symbols`, language))
        }
        if (!route.params.expense) {
            const date = getTodayInMS()
            dispatch(addExpense(name, sum, date, route.params.period, category))
            dispatch(changeWalletSum(route.params.sum - sum))
            route.params.categories.map(c => {
                if (c.name === category) {
                    // !!! don't effect on the plan
                    // if (c.plan - c.fact - sum < sumPlan()) {
                    //     let restSum = sumPlan() - (c.plan - c.fact - sum)
                    //     dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan + restSum))
                    // }

                    dispatch(changeCurrentCategoryFact(route.params.period, c.id, c.fact + sum))
                }
            })
        } else {
            if (category !== route.params.expense.category) {
                dispatch(changeExpenseCategory(route.params.expense.id, category))
                route.params.categories.map(c => {
                    if (route.params.expense.category === c.name) {
                        console.log(route.params.period, c.id, c.fact - route.params.expense.sum)
                        dispatch(changeCurrentCategoryFact(route.params.period, c.id, c.fact - route.params.expense.sum))
                    }
                })
                dispatch(changeWalletSum(route.params.sum - route.params.expense.sum + sum))
                dispatch(changeExpenseName(route.params.expense.id, name))
                dispatch(changeExpenseSum(route.params.expense.id, sum))
                route.params.categories.map(c => {
                    if (c.name === category) {
                        // if (c.plan - c.fact - sum < sumPlan()) {
                        //     let restSum = sumPlan() - (c.plan - c.fact - sum)
                        //     dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan + restSum))
                        // }
                        dispatch(changeCurrentCategoryFact(route.params.period, c.id, c.fact + sum))
                    }
                })
            } else {
                dispatch(changeWalletSum(route.params.sum - route.params.expense.sum + sum))
                dispatch(changeExpenseName(route.params.expense.id, name))
                dispatch(changeExpenseSum(route.params.expense.id, sum))
                route.params.categories.map(c => {
                    if (c.name === category) {
                        // if (c.plan - c.fact + route.params.expense.sum - sum < sumPlan()) {
                        //     let restSum = sumPlan() - (c.plan - c.fact + route.params.expense.sum - sum)
                        //     dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan + restSum))
                        // }
                        dispatch(changeCurrentCategoryFact(route.params.period, c.id, c.fact - route.params.expense.sum + sum))
                    }
                })
            }
        }
        dispatch(getReportPeriod(route.params.period))
        navigation.goBack()

    }


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.wrap}>
                {route.params.expense &&
                <View style={{position: 'absolute', right: 20, top: 20}}>
                    <TouchableWithoutFeedback onPress={removeHandler}>
                        <MaterialCommunityIcons name="credit-card-remove-outline" size={35}
                                                color={THEME.color.red}/>
                    </TouchableWithoutFeedback>
                </View>
                }

                <MaterialCommunityIcons name="credit-card-minus-outline" size={50}
                                        color={THEME.dark.income} style={{paddingLeft: 20}}/>

                <AppText text={lang('Expense:', language)} fontSize={24} otherStyle={{padding: 0}}/>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={name ? styles.inputFilled : styles.input}
                    placeholder={lang('Enter expense name', language)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                    keyboardAppearance='dark'
                />

                <AppText text={lang('Sum:', language)} fontSize={24} otherStyle={{padding: 0}}/>
                <TextInput
                    value={sum.toString()}
                    onChangeText={text => inputNumberHandler(text, setSum)}
                    style={sum ? styles.inputFilled : styles.input}
                    placeholder={lang('Enter money spent', language)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardAppearance='dark'
                    keyboardType='numeric'
                    maxLength={9}
                />

                <View style={{flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%', alignItems: 'center'}}>
                    <AppText text={lang('Category:', language)} fontSize={18} otherStyle={{padding: 0}}/>
                    {categoryName}
                </View>

                <View style={styles.buttons}>
                    <AppButton
                        title={lang('Cancel', language)}
                        color={THEME.color.dark}
                        onPress={cancelHandler}
                        textStyle={{color: THEME.light.expense}}
                    />
                    <AppButton
                        title={lang('Save', language)}
                        color={THEME.dark.income}
                        onPress={saveHandler}
                        textStyle={{color: THEME.color.dark}}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )


}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'space-evenly',
        // paddingVertical: 100,
        alignItems: 'center',
        backgroundColor: THEME.light.expense,
    },
    input: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        backgroundColor: THEME.color.milk,
    },
    inputFilled: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        borderBottomColor: THEME.color.dark,
        borderBottomWidth: .7
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    picker: {
        flex: 1,
        // height: 50,
        // backgroundColor: THEME.color.smooth,
        // width: '80%',
        fontSize: 18,
        fontFamily: 'bitter-regular',
        color: THEME.color.dark,
        // paddingBottom: 40
    }
})
