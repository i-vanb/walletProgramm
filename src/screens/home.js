import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Alert, Modal
} from 'react-native'
import {useDispatch, useSelector} from "react-redux"

import {THEME} from "../theme"

import {CategoryCard} from "../components/CategoryCard"
import {IncomeCard} from "../components/IncomeCard"
import {lang} from "../utilities/lang"
import {Loading} from "../components/Loading"
import {getPeriods} from "../store/actions/period"
import {getWallet} from "../store/actions/wallet"
import {getPlans} from "../store/actions/plan"
import {getSettings} from "../store/actions/settings"
import {getIncomes} from "../store/actions/income"
import {getExpense} from "../store/actions/expense"
import {getCurrentPeriod} from "../store/actions/current"
import {AddIncomeButton, AddExpenseButton, AddPlanButton} from "../components/AddButton";




export const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch()

    const periods = useSelector(state => state.period)
    const wallet = useSelector(state => state.wallet)
    const incomes = useSelector(state => state.income)
    const currents = useSelector(state => state.current)
    const settings = useSelector(state => state.settings)
    const {theme, language} = settings

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        dispatch(getWallet())
        dispatch(getPlans())
        dispatch(getPeriods())
        dispatch(getSettings())
        dispatch(getPlans())
        setTimeout(()=> {
            console.log('finishing loading')
            setIsLoading(false)
        }, 5000)
    }, [])

    if (periods.length && !currents.length) {
        dispatch(getIncomes(periods[periods.length - 1].name))
        dispatch(getExpense(periods[periods.length - 1].name))
        dispatch(getCurrentPeriod(periods[periods.length - 1].name))
    }

    if (!currents.length) {
        return (
            <View>
                {/*<AppText text='before'/>*/}
                <Modal
                    animationType="none"
                    transparent={false}
                    visible={isLoading}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.")
                    }}
                >
                    <Loading theme={theme} language={language}/>
                </Modal>
            </View>
        )
    }


    const addIncomeHandler = () => {
        const props = {period: periods[periods.length - 1].name, wallet: wallet.sum}
        navigation.navigate('Income Editing', props)
    }

    const editIncomeHandler = income => {
        const props = {
            period: periods[periods.length - 1].name,
            income: income,
            wallet: wallet.sum
        }
        navigation.navigate('Income Editing', props)
    }

    const onDetailHandler = (category) => {
        navigation.navigate('Expenses',
            {
                ...category,
                period: periods[periods.length - 1].name
            })
    }

    const expenseAddHandler = () => {
        const props = {
            categories: currents,
            sum: wallet.sum,
            period: periods[periods.length - 1].name
        }
        navigation.navigate('Expenses Editing', props)
    }

    const addPlanHandler = () => {
        const props = {
            categories: currents,
            sum: wallet.sum,
            period: periods[periods.length - 1].name
        }
        navigation.navigate('Plan Editing', props)
    }

    const planEditHandler = ({name, sum, category, deadline, id}) => {
        const props = {
            categories: currents,
            sum: wallet.sum,
            period: periods[periods.length - 1].name,
            currentPlan: {name, sum, category, deadline, id}
        }
        navigation.navigate('Plan Editing', props)
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: THEME[theme].back
        }}>

            <View style={{
                justifyContent: 'flex-start',
                flex: 1
            }}>
                <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        elevation: 10,
                        backgroundColor: THEME[theme].back,
                        shadowOffset: {
                            width: 0,
                            height: 1
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 1
                    }}>
                    <ScrollView horizontal={true}>
                        <View style={styles.cardsContainerHor}>
                            {incomes.length
                                ? incomes.map(income =>
                                    <TouchableWithoutFeedback onPress={() => editIncomeHandler(income)}
                                                              key={income.id}>
                                        <View><IncomeCard name={income.name} date={income.date} theme={theme}
                                                          sum={income.sum}/></View>
                                    </TouchableWithoutFeedback>
                                ) : null
                                // : <View style={{
                                //     flexDirection: 'row',
                                //     alignItems: 'center',
                                //     height: 60,
                                //     paddingLeft: 10,
                                // }}>
                                //     <MaterialCommunityIcons name="hand-pointing-left" size={40}
                                //                             color={THEME[theme].income}/>
                                //     <AppText text={lang('Add Income', language)} color={THEME[theme].income}
                                //              otherStyle={{padding: 10}}/>
                                // </View>
                            }
                        </View>
                    </ScrollView>
                    </View>
                    <View style={styles.cardsContainer}>
                        {currents.map(category =>
                            <TouchableWithoutFeedback onPress={() => onDetailHandler(category)}
                                                      key={category.id}>
                                <View>
                                    <CategoryCard plan={category.plan} icon={category.icon} fact={category.fact}
                                                  name={lang(category.name, language)} theme={theme}
                                                  iconLibrary={category.iconLibrary}/>
                                </View>

                            </TouchableWithoutFeedback>
                        )}
                    </View>

                </ScrollView>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 5,
                paddingHorizontal: 20,
                elevation: 10,
                backgroundColor: THEME[theme].back,
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                shadowOpacity: 0.1,
                shadowRadius: 1
            }}>

                <AddIncomeButton theme={theme} onPress={addIncomeHandler} />
                <AddExpenseButton theme={theme} onPress={expenseAddHandler} />
                <AddPlanButton theme={theme} onPress={addPlanHandler} />
                <Modal
                    animationType="none"
                    transparent={false}
                    visible={isLoading}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.")
                    }}
                >
                    <Loading theme={theme} language={language}/>
                </Modal>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardsContainerHor: {
        flexDirection: 'row-reverse',
        width: '100%',
        // paddingHorizontal: 10
        // paddingVertical: 5
    },
    card: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '25%'
    },
    incomeCard: {
        alignItems: 'center',
        width: 100,
        justifyContent: 'flex-end'
    }
})

