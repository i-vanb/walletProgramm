import React, {useState} from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput
} from 'react-native'
import {THEME} from "../theme";
import {AppText} from "../components/ui/AppText";
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons"
import {useDispatch, useSelector} from "react-redux";
import {numToString} from "../utilities/numToString";
import {PlanCard} from "../components/PlanCard";
import {lang} from "../utilities/lang";
import {CategoryCard} from "../components/CategoryCard";
import {LabelCard} from "../components/LabelCard";
import {Text} from "react-native-svg";
import {AppButton} from "../components/ui/AppButton";
import {Calendar} from "../components/Calendar";
import {inputNumberHandler} from "../utilities/inputNumberHandler";
import {addCategory} from "../store/actions/category";
import {addCurrentCategory, changeCurrentCategoryPlan} from "../store/actions/current";
import {ExpenseCard} from "../components/ExpenseCard";
import {dateToString} from "../utilities/dateToString";
import {getTodayInMS} from "../utilities/getTodayInMS";

export const ExpensesScreen = ({navigation, route}) => {
    const dispatch = useDispatch()

    const [isPlanChange, setIsPlanChange] = useState(false)

    const expenses = useSelector(state => state.expense)
    const currentExpenses = expenses.filter(e => e.category === route.params.name)

    const currents = useSelector(state => state.current)
    const wallet = useSelector(state => state.wallet)
    const current = currents.filter(c => c.name === route.params.name)[0]
    const plans = useSelector(state => state.plan)
    const currentPlans = plans.filter(p => p.category === route.params.name)
    const currentPlanSum = currentPlans.reduce((total, plan) => total + plan.sum, 0)


    const settings = useSelector(state => state.settings)
    const {theme, language} = settings

    const {fact, plan, icon, iconLibrary, name, period, id} = route.params
    const [planSum, setPlanSum] = useState(current.plan)

    const savePlanHandler = () => {
        dispatch(changeCurrentCategoryPlan(period, id, planSum))
        setIsPlanChange(false)
    }

    const planEditHandler = ({name, sum, category, deadline, id}) => {
        const props = {
            categories: currents,
            sum: wallet.sum,
            period,
            currentPlan: {name, sum, category, deadline, id}
        }
        navigation.navigate('Plan Editing', props)
    }

    // const expenseAddHandler = () => {
    //     const props = {
    //         categories: currents,
    //         sum: wallet.sum,
    //         period: route.params.period,
    //         category: route.params.name
    //     }
    //     navigation.navigate('Expenses Editing', props)
    // }

    const categoryEditingHandler = () => {
        const props = {
            ...route.params,
            sum: wallet.sum,
            categories: currents,
            plans
        }
        navigation.navigate('Category Editing', props)
    }

    const expenseEditHandler = ({id, name, sum, category}) => {
        const props = {
            categories: currents,
            sum: wallet.sum,
            period: route.params.period,
            expense: {id, name, sum, category}
        }
        navigation.navigate('Expenses Editing', props)
    }

    navigation.setOptions({
        title: lang(name, language),
        headerTitleStyle: {
            color: THEME[theme].title,
        },
        headerRight: () =>
            <TouchableWithoutFeedback onPress={categoryEditingHandler}>
                <View style={{paddingRight: 10, paddingBottom: 0}}>
                    <View style={{alignItems: 'center'}}>
                        <MaterialCommunityIcons name="pencil-box-outline" size={24} color={THEME.color.yellow}/>
                    </View>
                    <View style={{width: '100%', alignSelf: 'center'}}>
                        <AppText text={lang('change plan', language)} color={THEME[theme].expense}
                                 otherStyle={{padding: 0}}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>,
        headerLeft: () => <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{paddingLeft: 10}}>
                <AntDesign name="caretleft" size={24} color={THEME[theme].title}/>
            </View>
        </TouchableWithoutFeedback>,
        headerStyle: {
            backgroundColor: THEME[theme].main,
        },
    })


    // const expensesList = expenses.map(expense => expense.category === route.params.name &&
    //     <TouchableWithoutFeedback
    //         onPress={() => expenseEditHandler(expense.id, expense.name, expense.sum, expense.category)}
    //         key={expense.id}>
    //         <View style={styles.card}>
    //             <AppText text={expense.sum} fontSize={12}/>
    //             <MaterialCommunityIcons name={route.params.icon} size={24}
    //                                     color={THEME.color.green}/>
    //             <AppText text={expense.name} fontSize={12}/>
    //         </View>
    //     </TouchableWithoutFeedback>).reverse()

    // const addExpense = <TouchableWithoutFeedback onPress={expenseAddHandler}>
    //     <View style={styles.card}>
    //         <MaterialCommunityIcons name="credit-card-minus-outline" size={24}
    //                                 color={THEME.color.yellow}/>
    //         <AppText text='add expense' fontSize={12} color={THEME.color.yellow}/>
    //     </View>
    // </TouchableWithoutFeedback>

    const fill = current.fact / current.plan * 100

    return (
        <View style={{backgroundColor: THEME[theme].back, flex: 1}}>
            <View>
                <View style={{flexDirection: 'row', position: 'absolute', height: 30}}>
                    <View style={{backgroundColor: THEME[theme].expense, width: `${fill}%`}}></View>
                    <View style={{backgroundColor: THEME[theme].empty, width: `${100 - fill}%`}}></View>
                </View>
                <AppText text={numToString(current.plan) + ' / ' + numToString(current.fact)} fontSize={20}/>
                <AppText text={lang('plan / fact', language)} fontSize={12} color={THEME[theme].empty}/>

            </View>
            <ScrollView>
                <View style={{
                    backgroundColor: THEME[theme].empty,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                }}>

                    <AppText text={lang('Current plans', language)} color={THEME[theme].back} otherStyle={{padding: 0}}
                             fontSize={18}/>
                    {/*<TouchableOpacity*/}
                    {/*    onPress={() => setIsPlanChange(true)}*/}
                    {/*>*/}
                    <View>
                        <AppText text={numToString(current.plan)} otherStyle={{padding: 0}} fontSize={18}/>
                        {/*<AppText text={lang('change', language)} otherStyle={{padding: 0}} fontSize={12}/>*/}
                    </View>
                    {/*</TouchableOpacity>*/}
                </View>
                {currentPlans.filter(p => p.deadline > 0).map(p => {
                    return (
                        // planEditHandler = ({name, sum, category, deadline, id})
                        <TouchableWithoutFeedback key={p.id}
                                                  onPress={() => planEditHandler({ name: p.name, sum: p.sum, category: p.category, deadline: p.deadline, id: p.id})}
                        >
                        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
                            <View style={{flex: 4, alignItems: 'flex-start', paddingHorizontal: 5, flexDirection: 'row'}}>
                                <AppText text={p.name} color={THEME[theme].title}/>
                                <AppText
                                         text={`${lang('in', language)} ${(p.deadline - getTodayInMS()) / 1000 / 60 / 60 / 24} ${lang('days', language)}`}
                                         color={(p.deadline - getTodayInMS()) / 1000 / 60 / 60 / 24<=0 ? THEME[theme].warning : THEME[theme].empty}/>

                            </View>

                            <AppText otherStyle={{flex: 1}} text={numToString(p.sum)} color={THEME[theme].title}/>
                        </View>
                        </TouchableWithoutFeedback>
                    )
                })}

                {currentPlans.filter(p => p.deadline === 0).map(p => {
                    return (
                        <TouchableWithoutFeedback key={p.id} onPress={
                            () => planEditHandler({ name: p.name, sum: p.sum, category: p.category, deadline: p.deadline, id: p.id})}

                        >
                        <View key={p.id} style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
                            {/*<AppText otherStyle={{flex: 1}} text='' color={THEME[theme].empty}/>*/}
                            <View style={{flex: 4, alignItems: 'flex-start', paddingHorizontal: 5}}>
                                <AppText otherStyle={{flex: 4}} text={p.name} color={THEME[theme].title}/>
                            </View>
                            <AppText otherStyle={{flex: 1}} text={numToString(p.sum)} color={THEME[theme].title}/>
                        </View>
                        </TouchableWithoutFeedback>
                    )
                })}
                {current.plan - currentPlanSum > 0 &&
                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
                        {/*<AppText otherStyle={{flex: 1}} text='' color={THEME[theme].empty}/>*/}
                        <View style={{flex: 4, alignItems: 'flex-start', paddingHorizontal: 5}}>
                            <AppText otherStyle={{flex: 4}} text={lang('others', language)} color={THEME[theme].title}/>
                        </View>
                        <AppText otherStyle={{flex: 1}} text={numToString(current.plan - currentPlanSum)}
                                 color={THEME[theme].title}/>
                    </View>
                }
                {/*<View style={styles.cardsContainer}>*/}
                {/*    {currentPlans.map(plan =>*/}
                {/*        <TouchableWithoutFeedback onPress={() => {*/}
                {/*            planEditHandler(plan)*/}
                {/*        }} key={plan.id}>*/}
                {/*            <View>*/}
                {/*                <PlanCard name={plan.name} theme={theme} deadline={plan.deadline}*/}
                {/*                          date={plan.date} sum={plan.sum}/>*/}
                {/*            </View>*/}
                {/*        </TouchableWithoutFeedback>*/}
                {/*    )}*/}
                {/*</View>*/}

                <View style={{
                    backgroundColor: THEME[theme].empty,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                }}>
                    <AppText text={lang('Current expenses', language)} color={THEME[theme].back}
                             otherStyle={{padding: 0}}
                             fontSize={18}/>
                    <View>
                        <AppText text={numToString(current.fact)} otherStyle={{padding: 0}} fontSize={18}/>
                        {/*<AppText text={lang('change', language)} otherStyle={{padding: 0}} fontSize={12}/>*/}
                    </View>
                </View>
                {currentExpenses.map((e, i) => {
                    return (
                        <TouchableWithoutFeedback key={e.id}
                            onPress={() => expenseEditHandler({id:e.id, name: e.name, sum: e.sum, category: e.category})}
                        >
                            <View  style={{flexDirection: 'row', paddingHorizontal: 10}}>
                                <AppText otherStyle={{flex: 1}} text={dateToString(e.date)} color={THEME[theme].empty}/>
                                <View style={{flex: 4, alignItems: 'flex-start', paddingHorizontal: 5}}>
                                    <AppText text={e.name} color={THEME[theme].title}/>
                                </View>
                                <AppText otherStyle={{flex: 1}} text={numToString(e.sum)} color={THEME[theme].title}/>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isPlanChange}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.")
                }}
            >
                <View style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '90%',
                        height: '25%',
                        minHeight: 200,
                        backgroundColor: THEME[theme].back,
                        padding: 10,
                        justifyContent: 'space-between'
                    }}>
                        <AppText text={lang('Enter the money you plan to spend', language)} fontSize={18}
                                 otherStyle={{padding: 0}}/>

                        <View>
                            <TextInput
                                value={planSum.toString()}
                                onChangeText={text => inputNumberHandler(text, setPlanSum)}
                                style={planSum !== 0 ? styles.inputFilled : styles.input}
                                placeholder={lang('Enter the sum', language)}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardAppearance='dark'
                                keyboardType='numeric'
                            />
                            {planSum < currentPlanSum ?
                                <AppText text={lang("Plan can't be less than", language) + ' ' + currentPlanSum}
                                         fontSize={12}
                                         otherStyle={{alignSelf: 'flex-start'}} color={THEME[theme].warning}/> : null}
                        </View>
                        <View style={styles.buttons}>
                            <AppButton
                                title={lang('Cancel', language)}
                                color={THEME.color.dark}
                                onPress={() => {
                                    setPlanSum(current.plan)
                                    setIsPlanChange(false)
                                }}
                                textStyle={{color: THEME.color.yellow}}
                            />
                            <AppButton
                                title={lang('Save', language)}
                                color={THEME.color.green}
                                onPress={savePlanHandler}
                                textStyle={{color: THEME.color.dark}}
                                disabled={planSum < currentPlanSum}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    cardsContainerHor: {
        flexDirection: 'row',
        width: '100%'
    },
    expenses: {
        flexDirection: 'row',
        paddingBottom: 5,
        marginTop: 20,
        paddingLeft: 20
    },
    card: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 90
    },
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
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    input: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        backgroundColor: THEME.color.milk,
        // marginTop: 20
    },
    inputFilled: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        borderBottomColor: THEME.color.dark,
        borderBottomWidth: .7,
        // marginTop: 20
    },

})
