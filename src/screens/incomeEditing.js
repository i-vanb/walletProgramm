import React, {useState} from 'react'

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import {THEME} from '../theme'
import {inputNumberHandler} from "../utilities/inputNumberHandler"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AppText} from "../components/ui/AppText"
import {AppButton} from "../components/ui/AppButton"
import {useDispatch, useSelector} from "react-redux"
import {getTodayInMS} from "../utilities/getTodayInMS"
import {changeWalletSum} from "../store/actions/wallet"

import {addIncome, changeIncomeName, changeIncomeSum, deleteIncome} from "../store/actions/income"
import {lang} from "../utilities/lang";
import {getReportIncomes, getReportPeriod} from "../store/actions/report";

export const IncomeEditingScreen = ({navigation, route}) => {
    const dispatch = useDispatch()
    const settings = useSelector(state => state.settings)
    const {theme, language} = settings

    const [name, setName] = useState(route.params.income ? route.params.income.name : lang('income', language))
    const [sum, setSum] = useState(route.params.income ? route.params.income.sum : '')
    // console.log('income edit', route.params)
    // console.log(route.params.wallet + sum)


    navigation.setOptions({
        headerStyle: {
            backgroundColor: THEME.color.dark
        },
        headerLeft: () => {
        },
        headerTitle: () =>
            <View>
                <Text style={{
                    fontFamily: 'bitter-regular',
                    fontSize: 18,
                    color: THEME[theme].expense,
                    textAlign: 'right'
                }}>{lang('Income Editor', language)}</Text>
            </View>
    })

    const cancelHandler = () => {
        navigation.goBack()
    }

    const removeHandler = () => {
        Alert.alert(
            lang('Removing income', language),
            lang('Do you really want to remove the income?', language),
            [
                {
                    text: lang('cancel', language),
                    style: 'cancel'
                },
                {
                    text: lang('remove', language), style: 'destructive', onPress: () => {
                        dispatch(changeWalletSum(route.params.wallet - route.params.income.sum))
                        dispatch(deleteIncome(route.params.income.id))
                        dispatch(getReportIncomes(route.params.period))
                        navigation.goBack()
                    }
                }
            ],
            {cancelable: false}
        )
    }

    const saveHandler = () => {
        if (name.trim().length < 3) {
            return Alert.alert(lang('Error!', language), lang(`Minimum three symbols.`, language))
        }
        const date = getTodayInMS()
        console.log(name, sum, date, route.params.period)
        if (route.params.income) {
            console.log('incomeEdit route if true')
            dispatch(changeIncomeSum(route.params.income.id, sum))
            dispatch(changeIncomeName(route.params.income.id, name))
            dispatch(changeWalletSum(route.params.wallet - route.params.income.sum + sum))
            dispatch(getReportIncomes(route.params.period))
        } else {
            console.log('incomeEdit route if false')
            dispatch(addIncome(name, sum, date, route.params.period))
            dispatch(changeWalletSum(route.params.wallet + sum))
            dispatch(getReportIncomes(route.params.period))
        }
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrap}>
                    {route.params.income &&
                    <View style={{position: 'absolute', right: 20, top: 20}}>
                        <TouchableWithoutFeedback onPress={removeHandler}>
                            <MaterialCommunityIcons name="credit-card-remove-outline" size={35}
                                                    color={THEME[theme].warnings}/>
                        </TouchableWithoutFeedback>
                    </View>
                    }

                    <MaterialCommunityIcons name="credit-card-plus-outline" size={50}
                                            color={THEME[theme].expense} style={{paddingBottom: 50}}/>
                    <AppText text={lang('Income:', language)} fontSize={24} otherStyle={{padding: 0}}/>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={name ? styles.inputFilled : styles.input}
                        placeholder={lang('Enter income name', language)}
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
                        placeholder={lang('Enter money earned', language)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        keyboardType='numeric'
                        maxLength={9}
                    />
                    <View style={styles.buttons}>
                        <AppButton
                            title={lang('Cancel', language)}
                            color={THEME.dark.back}
                            onPress={cancelHandler}
                            textStyle={{color: THEME[theme].expense}}
                        />
                        <AppButton
                            title={lang('Save', language)}
                            color={THEME[theme].expense}
                            onPress={saveHandler}
                            textStyle={{color: THEME.dark.back}}
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
        justifyContent: 'center',
        // paddingVertical: 100,
        alignItems: 'center',
        backgroundColor: THEME.dark.income
    },
    input: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        backgroundColor: THEME.color.milk,
        marginBottom: 30,
        marginTop: 20
    },
    inputFilled: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        borderBottomColor: THEME.color.dark,
        borderBottomWidth: .7,
        marginBottom: 30,
        marginTop: 20
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    picker: {
        height: 50,
        width: 200,
        fontSize: 20,
        fontFamily: 'bitter-regular',
        color: THEME.color.dark,
        textAlign: 'right',
        paddingBottom: 40
    }
})
