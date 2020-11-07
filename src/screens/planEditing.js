import React, {useState, useEffect} from 'react'

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    Alert,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Keyboard,
    Switch,
    Modal,
    TouchableOpacity, KeyboardAvoidingView
} from 'react-native'
import {THEME} from '../theme'
import {inputNumberHandler} from "../utilities/inputNumberHandler"
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";
import {useDispatch, useSelector} from "react-redux";
import {getTodayInMS} from "../utilities/getTodayInMS";
import {Calendar} from "../components/Calendar";
import {changeCurrentCategoryFact, changeCurrentCategoryPlan} from "../store/actions/current";
import {
    addPlan,
    changePlanCategory,
    changePlanDeadline,
    changePlanName,
    changePlanSum,
    deletePlan
} from "../store/actions/plan";
import {addExpense} from "../store/actions/expense";
import {changeWalletSum} from "../store/actions/wallet";
import {lang} from "../utilities/lang";

export const PlanEditingScreen = ({navigation, route}) => {

    const dispatch = useDispatch()

    const [category, setCategory] = useState(route.params.currentPlan ? route.params.currentPlan.category : route.params.categories[0].name)
    const [name, setName] = useState(route.params.currentPlan ? route.params.currentPlan.name : '')
    const [sum, setSum] = useState(route.params.currentPlan ? route.params.currentPlan.sum : '')
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState(route.params.currentPlan ? route.params.currentPlan.deadline ? route.params.currentPlan.deadline : 0 : 0)
    const [calendar, setCalendar] = useState({})

    const [isDone, setIsDone] = useState(false)
    const [factSum, setFactSum] = useState(route.params.currentPlan ? route.params.currentPlan.sum : 0)

    const settings = useSelector(state => state.settings)
    const {theme, language} = settings
    // console.log(calendar)

    const saveDateHandler = (year, month, date) => {
        setIsDate(!isDate)
        const newDate = Date.UTC(year, month, date)
        setDate(newDate)
    }


    useEffect(() => {
        const getDaysInMonth = (date) => {
            return 32 - new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 32).getDate()
        }

        const today = getTodayInMS()
        const firstMonth = new Date(today).getMonth()
        const firstYear = new Date(today).getFullYear()
        const daysInFirstMonth = getDaysInMonth(today)
        const firstMonthArray = () => {
            let array = []
            for (let i = new Date(today).getDate(); i <= daysInFirstMonth; i++)
                array.push(i.toString())
            return array
        }
        const secondMonth = new Date(today).getMonth() === 11 ? 0 : new Date(today).getMonth() + 1
        const secondYear = new Date(today).getMonth() === 11 ? new Date(today).getFullYear() + 1 : new Date(today).getFullYear()
        const secondDateMS = Date.parse(new Date(Date.UTC(secondYear, secondMonth, 1)).toString())
        const daysInSecondMonth = getDaysInMonth(secondDateMS)
        const secondMonthArray = () => {
            let array = []
            for (let i = new Date(secondDateMS).getDate(); i <= daysInSecondMonth; i++)
                array.push(i.toString())
            return array
        }
        const thirdMonth = secondMonth === 11 ? 0 : secondMonth + 1
        const thirdYear = secondMonth === 11 ? secondYear + 1 : secondYear
        const thirdDateMS = Date.parse(new Date(Date.UTC(thirdYear, thirdMonth, 1)).toString())
        const daysInThirdMonth = getDaysInMonth(thirdDateMS)
        const thirdMonthArray = () => {
            let array = []
            for (let i = new Date(thirdDateMS).getDate(); i <= daysInThirdMonth; i++)
                array.push(i.toString())
            return array
        }
        let calendarObject = {}
        if (firstYear === secondYear) {
            calendarObject = {
                [firstYear]: {
                    [firstMonth]: firstMonthArray(),
                    [secondMonth]: secondMonthArray()
                }
            }
        } else {
            calendarObject = {
                [firstYear]: {
                    [firstMonth]: firstMonthArray()
                },
                [secondYear]: {
                    [secondMonth]: secondMonthArray()
                }
            }
        }
        if (secondYear === thirdYear) {
            calendarObject[secondYear][thirdMonth] = thirdMonthArray()
        } else {
            calendarObject[thirdYear][thirdMonth] = thirdMonthArray()
        }
        setCalendar(calendarObject)
    }, [])


    const [isEnabled, setIsEnabled] = useState(route.params.currentPlan ? route.params.currentPlan.deadline ? true : false : false)
    const toggleSwitch = () => {
        if (isEnabled) {
            setIsDate(false)
            setDate(0)
        } else {
            setIsDate(true)
        }
        setIsEnabled(previousState => !previousState)
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
                    color: THEME.color.milk,
                    textAlign: 'right'
                }}>{lang('Planning Expense', language)}</Text>
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
            lang('Removing plan', language),
            lang('Do you really want to remove the plan?', language),
            [
                {
                    text: lang('Cancel', language),
                    style: 'cancel'
                },
                {
                    text: lang('remove', language), style: 'destructive', onPress: () => {
                        route.params.categories.map(c => {
                            if (c.name === route.params.currentPlan.category) {
                                dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan - route.params.currentPlan.sum))
                            }
                        })
                        dispatch(deletePlan(route.params.currentPlan.id))
                        navigation.goBack()
                    }
                }
            ],
            {cancelable: false}
        )
    }

    const doneHandler = () => {
        if (route.params.sum - sum < 0) {
            return Alert.alert(lang('You are trying to spend more then you have!', language), lang(`Check your balance!`, language))
        }
        const date = getTodayInMS()
        dispatch(addExpense(route.params.currentPlan.name, route.params.currentPlan.sum, date, route.params.period, route.params.currentPlan.category))
        dispatch(changeWalletSum(route.params.sum - route.params.currentPlan.sum))
        route.params.categories.map(c => {
            if (c.name === route.params.currentPlan.category) {
                dispatch(changeCurrentCategoryFact(route.params.period, c.id, c.fact + factSum))
            }
        })
        dispatch(deletePlan(route.params.currentPlan.id))
        navigation.goBack()
    }

    const saveHandler = () => {
        if (name.trim().length < 3) {
            return Alert.alert(lang('Error!', language), lang('Minimum three symbols', language))
        }
        if (!sum > 0) {
            return Alert.alert(lang('Error!', language), lang('You need to fill sum', language))
        }

        if (route.params.currentPlan) {
            if (route.params.currentPlan.category === category) {
                route.params.categories.map(c => {
                    if (c.name === category) {
                        dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan - route.params.currentPlan.sum + sum))
                    }
                })
            } else {
                route.params.categories.map(c => {
                    if (c.name === route.params.currentPlan.category) {
                        dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan - route.params.currentPlan.sum))
                    }
                    if (c.name === category) {
                        dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan + sum))
                    }
                })
            }

            dispatch(changePlanCategory(route.params.currentPlan.id, category))
            dispatch(changePlanName(route.params.currentPlan.id, name))
            dispatch(changePlanSum(route.params.currentPlan.id, sum))
            dispatch(changePlanDeadline(route.params.currentPlan.id, date))
        } else {
            route.params.categories.map(c => {
                if (c.name === category) {
                    console.log(c.name, category)
                    dispatch(changeCurrentCategoryPlan(route.params.period, c.id, c.plan + sum))
                }
            })
            const today = getTodayInMS()
            dispatch(addPlan(name, sum, today, category, date))
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

                    {route.params.currentPlan &&
                    <View style={{position: 'absolute', right: 20, top: 20}}>
                        <TouchableWithoutFeedback onPress={removeHandler}>
                            <MaterialCommunityIcons name="credit-card-remove-outline" size={30}
                                                    color={THEME.color.red}/>
                        </TouchableWithoutFeedback>
                    </View>
                    }

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isDone}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.")
                        }}
                    >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <AppText text={lang('Do you want to execute the plan?', language)} fontSize={18}/>
                                <AppText text={lang('Plan: ', language) + name}
                                         fontSize={18}
                                         otherStyle={{
                                             fontSize: 18,
                                             fontFamily: 'bitter-regular',
                                             color: THEME.color.dark,
                                         }}/>
                                <AppText text={lang('Price: ', language) + sum}
                                         fontSize={18}
                                         otherStyle={{
                                             fontSize: 18,
                                             fontFamily: 'bitter-regular',
                                             color: THEME.color.dark,
                                         }}/>
                                <View style={{flexDirection: 'row'}}>
                                    <AppText text={lang('Fact: ', language)} fontSize={18}
                                             otherStyle={{paddingTop: 10}}/>
                                    <TextInput
                                        value={factSum.toString()}
                                        onChangeText={text => inputNumberHandler(text, setFactSum)}
                                        style={factSum ? styles.inputFilled : styles.input}
                                        placeholder={lang('Enter money spent', language)}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardAppearance='dark'
                                        keyboardType='numeric'
                                    /></View>
                                <View style={styles.buttons}>
                                    <AppButton
                                        title={lang('Cancel', language)}
                                        color={THEME.color.dark}
                                        textStyle={{color: THEME.color.yellow}}
                                        onPress={() => setIsDone(false)}
                                    />
                                    <AppButton
                                        title={lang('done', language)}
                                        color={THEME.light.expense}
                                        textStyle={{color: THEME.color.dark}}
                                        onPress={doneHandler}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isDate}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.")
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{lang('Choose date for paying', language)}</Text>
                                <Calendar calendar={calendar}
                                          saveDateHandler={saveDateHandler}
                                          currentDate={date}
                                          language={language}
                                />
                            </View>
                        </View>
                    </Modal>

                    <MaterialCommunityIcons name="calendar-edit" size={50}
                                            color={THEME.color.milk} style={{paddingLeft: 20}}/>
                    <View style={{flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%', alignItems: 'center'}}>
                        <AppText text={lang('Category:', language)} fontSize={18} otherStyle={{padding: 0}}/>
                        {categoryName}
                    </View>

                    <AppText text={lang('Expense name:', language)} fontSize={18} otherStyle={{padding: 0}}/>
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

                    <AppText text={lang('Sum:', language)} fontSize={18} otherStyle={{padding: 0}}/>
                    <TextInput
                        value={sum.toString()}
                        onChangeText={text => inputNumberHandler(text, setSum)}
                        style={sum ? styles.inputFilled : styles.input}
                        placeholder={lang('Enter money spent', language)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        keyboardType='numeric'
                    />

                    <View style={{flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%', alignItems: 'center'}}>
                        <AppText text={lang('Time limit', language)} fontSize={18} otherStyle={{padding: 0}}/>
                        <Switch
                            trackColor={{false: THEME.color.gray, true: THEME.color.milk}}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    {isEnabled &&
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingLeft: '15%',
                        paddingRight: '15%',
                        alignItems: 'center'
                    }}>
                        <View style={{flex: 1}}>
                            <AppText text={lang('Target date: ', language)} fontSize={18} otherStyle={{padding: 0}}/>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                onPress={() => setIsDate(true)}
                            >
                                <AppText text={date ? new Date(date).toLocaleDateString() : null} fontSize={18}
                                         otherStyle={{padding: 0}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }

                    <View style={styles.buttons}>
                        <AppButton
                            title={lang('Cancel', language)}
                            color={THEME.color.dark}
                            onPress={cancelHandler}
                            textStyle={{color: THEME.color.milk}}
                        />
                        <AppButton
                            title={lang('Save', language)}
                            color={THEME.color.yellow}
                            onPress={saveHandler}
                            textStyle={{color: THEME.color.dark}}
                        />
                        {route.params.currentPlan &&
                        <AppButton
                            title={lang('Done', language)}
                            color={THEME.color.yellow}
                            onPress={() => {
                                setIsDone(true)
                            }}
                            textStyle={{color: THEME.color.dark}}
                        />}
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
        backgroundColor: THEME.color.blue,
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
        fontSize: 18,
        fontFamily: 'bitter-regular',
        color: THEME.color.dark,
    },
    centeredView: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: THEME.color.transparent
    },
    modalView: {
        backgroundColor: THEME.color.milk,
        marginHorizontal: 10,
        padding: 20,
        alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
