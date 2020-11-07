import React, {useState, useEffect} from 'react'
import {
    View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView,
    ActivityIndicator
} from 'react-native'
import {MaterialCommunityIcons, FontAwesome, Foundation} from '@expo/vector-icons'
import {useDispatch, useSelector} from "react-redux"
import {THEME} from "../theme"
import {AppText} from "../components/ui/AppText"
import {lang} from "../utilities/lang"
import {capitalizeFirstLetter} from "../utilities/capitalizeFirstLetter"
import {Graphics} from "../components/Graphics"
import {numToString} from "../utilities/numToString"
import {getReportIncomes, getReportPeriod} from "../store/actions/report"

const slicedPeriodName = name => {
    let month = name.slice(0, name.indexOf('_'))
    let year = name.slice(name.indexOf('_') + 1)
    month = capitalizeFirstLetter(month)
    return {month, year}
}

export const ReportScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const period = useSelector(state => state.period)

    const {theme, language} = useSelector(state => state.settings)
    const {categories, incomes} = useSelector(state => state.report)

    const [currentPeriod, setCurrentPeriod] = useState(period[period.length - 1])
    const [number, setNumber] = useState(period.length - 1)
    const [highlight, setHighlight] = useState(0)
    const [isCircle, setIsCircle] = useState(true)


    useEffect(() => {
        period.map(p => {
            dispatch(getReportPeriod(p.name))
            dispatch(getReportIncomes(p.name))
        })
    }, [])

    if (!incomes[currentPeriod.name]) {
        return (
            <View style={{...styles.center, backgroundColor: THEME[theme].main}}>
                <ActivityIndicator color={THEME[theme].title}/>
            </View>
        )
    }

    const totalIncomeSum = incomes[currentPeriod.name].reduce((total, incomes) => total + incomes.sum, 0)
    const totalSum = currentPeriod.start + totalIncomeSum
    const totalExpenseSum = categories[currentPeriod.name].reduce((total, category) => total + category.fact, 0)
    const left = currentPeriod.start
    const saved = totalSum - totalExpenseSum

    const allExpensesSum = () => {
        let expenseSum = []
        period.map(p => {
            expenseSum = [...expenseSum, categories[p.name].reduce((total, c) => total + c.fact, 0)]
        })
        return expenseSum
    }

    const allIncomesSum = () => {
        let incomesSum = []
        period.map(p => {
            incomesSum = [...incomesSum, incomes[p.name].reduce((total, i) => total + i.sum, 0)]
        })
        return incomesSum
    }

    const allTotalSum = () => {
        let totals = []
        period.map((p, i) => {
            totals = [...totals, p.start + allIncomesSum()[i]]
        })
        return totals
    }

    const allSavedSum = () => {
        let saved = []
        allTotalSum().map((t, i) => {
            saved = [...saved, t - allExpensesSum()[i]]
        })
        return saved
    }

    const biggestNumber = Math.max(...allIncomesSum().concat(allExpensesSum().concat(allSavedSum())))

    const allTimeHandler = () => {
        const props = {
            period,
            expenses: allExpensesSum(),
            incomes: allIncomesSum(),
            totals: allTotalSum(),
            saved: allSavedSum(),
            biggestNumber: biggestNumber,
            theme,
            language,
        }
        navigation.navigate('All time', props)
    }


    const barContent = () =>
        <View>
            <View style={{flexDirection: 'row'}}>
                <Foundation name="graph-bar" size={24} color={THEME[theme].inactive} style={{paddingHorizontal: 10}}/>
                <AppText text={lang('Left from previous month', language)} color={THEME[theme].empty}/>
                <AppText text={numToString(left)} color={THEME[theme].inactive}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Foundation name="graph-bar" size={24} color={THEME[theme].income} style={{paddingHorizontal: 10}}/>
                <AppText text={lang('Earned in month', language)} color={THEME[theme].empty}/>
                <AppText text={numToString(totalIncomeSum)} color={THEME[theme].income}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Foundation name="graph-bar" size={24} color={THEME[theme].expense} style={{paddingHorizontal: 10}}/>
                <AppText text={lang('Spent in month', language)} color={THEME[theme].empty}/>
                <AppText text={numToString(totalExpenseSum)} color={THEME[theme].expense}/>
                <AppText text={Math.round(totalExpenseSum / totalSum * 100) + ' %'} color={THEME[theme].empty}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Foundation name="graph-bar" size={24} color={THEME[theme].plan} style={{paddingHorizontal: 10}}/>
                <AppText text={lang('Saved in month', language)} color={THEME[theme].empty}/>
                <AppText text={numToString(saved)} color={THEME[theme].plan}/>
            </View>
        </View>

    const circleContent = () =>
        <View>
            {categories[currentPeriod.name].filter(c => c.fact > 0).map((category, index) =>
                <TouchableWithoutFeedback key={category.id} onPress={() => {
                    if (highlight === category.id) {
                        setHighlight(0)
                    } else {
                        setHighlight(category.id)
                    }
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesome name="circle" size={24} color={THEME.colorBars[index + 1]}
                                     style={{paddingHorizontal: 10}}/>
                        <AppText text={lang(category.name, language)}
                                 color={highlight === category.id ? THEME[theme].plan : THEME[theme].empty}/>
                        <AppText text={Math.round(category.fact * 100 / totalSum)} color={THEME[theme].subtitle}/>
                        <AppText text='%' color={THEME[theme].subtitle} otherStyle={{paddingLeft: 0}}/>
                        <AppText text={numToString(category.fact)}
                                 color={highlight === category.id ? THEME[theme].plan : THEME[theme].empty}/>
                    </View>
                </TouchableWithoutFeedback>
            )}
            <View style={{flexDirection: 'row'}}>
                <FontAwesome name="circle" size={24} color={THEME.colorBars[0]} style={{paddingHorizontal: 10}}/>
                <AppText text={lang('money left', language)} color={THEME.colorBars[0]}/>
                <AppText text={Math.round((totalSum - totalExpenseSum) * 100 / totalSum)}
                         color={THEME.colorBars[0]}/>
                <AppText text='%' color={THEME.colorBars[0]}/>
                <AppText text={numToString(totalSum - totalExpenseSum)} color={THEME.colorBars[0]}/>
            </View>
        </View>

    return (
        <ScrollView style={{backgroundColor: THEME[theme].back}}>
            {/*<TouchableOpacity>*/}
            <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: THEME[theme].back}}>
                {/*<AppText text={lang('Period', language)}/>*/}

                <TouchableWithoutFeedback
                    disabled={number === 0}
                    onPress={() => {
                        setHighlight(0)
                        let nextNumber = number - 1
                        setCurrentPeriod(period[nextNumber])
                        setNumber(nextNumber)

                        // dispatch(getReportPeriod(period[nextNumber].name))
                        // dispatch(getReportIncomes(period[nextNumber].name))
                    }}>
                    <View style={{paddingHorizontal: 30}}>
                        <MaterialCommunityIcons name="menu-left" size={30}
                                                color={number === 0 ? THEME[theme].back : THEME[theme].title}/>
                    </View>
                </TouchableWithoutFeedback>

                <AppText text={slicedPeriodName(currentPeriod.name).year + ','} color={THEME[theme].title}/>
                <AppText text={lang(slicedPeriodName(currentPeriod.name).month, language)}
                         color={THEME[theme].title}/>

                <TouchableWithoutFeedback
                    disabled={number === period.length - 1}
                    onPress={() => {
                        setHighlight(0)
                        let nextNumber = number + 1
                        setNumber(nextNumber)
                        setCurrentPeriod(period[nextNumber])
                        // dispatch(getReportPeriod(period[nextNumber].name))
                        // dispatch(getReportIncomes(period[nextNumber].name))
                    }}>
                    <View style={{paddingHorizontal: 30}}>
                        <MaterialCommunityIcons name="menu-right" size={30}
                                                color={number === period.length - 1 ? THEME[theme].back : THEME[theme].title}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
                backgroundColor: THEME[theme].empty
            }}>
                <View>
                    <AppText text={lang('total money', language)} otherStyle={{padding: 0}}
                             color={THEME[theme].subtitle}/>
                    <AppText text={numToString(totalSum)} otherStyle={{padding: 0}} color={THEME[theme].title}/>
                </View>
                <View>
                    <AppText text={lang('total income', language)} otherStyle={{padding: 0}}
                             color={THEME[theme].subtitle}/>
                    <AppText text={numToString(totalIncomeSum)} otherStyle={{padding: 0}} color={THEME[theme].title}/>
                </View>
                <View>
                    <AppText text={lang('total spent', language)} otherStyle={{padding: 0}}
                             color={THEME[theme].subtitle}/>
                    <AppText text={numToString(totalExpenseSum)} otherStyle={{padding: 0}} color={THEME[theme].title}/>
                </View>
            </View>

            {period.length === 1 && totalExpenseSum === 0
                ? <AppText text={lang('There is no data yet', language)}/>
                : <View
                    style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 10
                    }}>
                    <TouchableOpacity onPress={() => setIsCircle(!isCircle)}>
                        <MaterialCommunityIcons name="menu-left" size={50} color={THEME[theme].subtitle}/>
                    </TouchableOpacity>

                    <Graphics totalSum={totalSum}
                              totalIncomeSum={totalIncomeSum}
                              totalExpenseSum={totalExpenseSum}
                              saved={saved}
                              left={left}
                              categories={categories[currentPeriod.name]}
                              highlightedElement={highlight}
                              isDetail={isCircle}
                              theme={theme}
                    />

                    <TouchableOpacity onPress={() => setIsCircle(!isCircle)}>
                        <MaterialCommunityIcons name="menu-right" size={50} color={THEME[theme].subtitle}/>
                    </TouchableOpacity>

                    <TouchableWithoutFeedback
                        disabled={period.length < 2}
                        onPress={allTimeHandler}
                    >
                        <View style={{
                            position: 'absolute',
                            right: 5,
                            bottom: 0,
                            backgroundColor: period.length < 2 ? THEME[theme].empty : THEME[theme].active,
                            borderRadius: 10
                        }}>
                            <AppText text={lang('All time', language)} fontSize={12} color={THEME[theme].main}/>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            }

            {period.length === 1 && totalExpenseSum === 0 ? null :
                isCircle
                    ? circleContent()
                    : barContent()

            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 200
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
