import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {Foundation, MaterialCommunityIcons} from '@expo/vector-icons'
import {FontAwesome5} from '@expo/vector-icons'

import React, {useEffect} from 'react'
import {View, StyleSheet, Text, TouchableWithoutFeedback, Image} from 'react-native'
import {useDispatch, useSelector} from "react-redux"
import {THEME} from "./theme"
import {getPeriods} from "./store/actions/period"
import {getWallet} from "./store/actions/wallet"
import {getPlans} from "./store/actions/plan"
import {AppText} from "./components/ui/AppText"
import {numToString} from "./utilities/numToString"

import {ExpenseEditingScreen} from "./screens/expenseEditing"
import {HomeScreen} from "./screens/home"
import {ProfileScreen} from "./screens/profile"
import {GoalsScreen} from "./screens/goals"
import {ExpensesScreen} from "./screens/expenses"
import {IncomeEditingScreen} from "./screens/incomeEditing"
import {CategoryEditingScreen} from "./screens/categoryEditing"
import {PlanEditingScreen} from "./screens/planEditing"
import {getSettings} from "./store/actions/settings"
import {lang} from "./utilities/lang";
import {ReportScreen} from "./screens/report";
import {AllTimeGraphicScreen} from "./screens/allTime";
import {Loading} from "./components/Loading";
import {SavingsScreen} from "./screens/savings";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const headerInfoPanel = (account, balance, restToSpend, theme, language) => {
    return (
            <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
                <View style={{paddingHorizontal: 10}}>
                    <AppText color={THEME[theme].title} text={lang('Account', language)}/>
                    <AppText color={THEME[theme].empty} text={numToString(account)} otherStyle={{padding: 0}}/>
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <AppText color={THEME[theme].title} text={lang('Balance', language)}/>
                    <AppText color={balance > 0 ? THEME[theme].income : THEME[theme].warning}
                             text={numToString(balance)}
                             otherStyle={{padding: 0}}
                    />
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <AppText color={THEME[theme].subtitle} text={lang('Plan', language)}/>
                    <AppText color={THEME[theme].empty} text={numToString(restToSpend)} otherStyle={{padding: 0}}/>
                </View>
            </View>
    )
}


function HomeTabs({navigation}) {
    const theme = useSelector(state => state.settings)

    // navigation.setOptions({
    //     headerLeft: () =>
    //         <View
    //             style={{paddingLeft: 20, paddingBottom: 0}}
    //         >
    //             <TouchableWithoutFeedback
    //                 onPress={
    //                     ()=>navigation.navigate('Savings')
    //                 }
    //             >
    //                 <View style={{alignItems: 'center'}}>
    //                     <FontAwesome5 name="piggy-bank" size={24}
    //                                   // color={THEME[theme].tabIcon}
    //                     />
    //                 </View>
    //             </TouchableWithoutFeedback>
    //             {/*<View style={{width: '100%', alignSelf: 'center'}}>*/}
    //             {/*    <AppText text={wallet.saving} color='gray' otherStyle={{padding: 0}}/>*/}
    //             {/*</View>*/}
    //         </View>
    // })

    return (
        <Tab.Navigator tabBarOptions={
            {
                activeBackgroundColor: THEME[theme.theme].back,
                inactiveBackgroundColor: THEME[theme.theme].main,
                inactiveTintColor: THEME[theme.theme].empty,
                activeTintColor: THEME[theme.theme].expense,
            }
        }>
            <Tab.Screen
                name={lang("Home", theme.language)}
                component={HomeScreen}
                options={{
                    tabBarIcon: info => <MaterialCommunityIcons name="home-circle" size={info.size} color={info.color}/>
                }}
            />
            <Tab.Screen
                name={lang("Reports", theme.language)} component={ReportScreen}
                options={{
                    tabBarIcon: info => <Foundation name="graph-pie" size={24} color={info.color}/>
                }}
            />
            <Tab.Screen
                name={lang("Goals", theme.language)} component={GoalsScreen}
                options={{
                    tabBarIcon: info => <MaterialCommunityIcons name="bank" size={info.size} color={info.color}/>
                }}
            />
            <Tab.Screen
                name={lang("Settings", theme.language)} component={ProfileScreen}
                options={{
                    tabBarIcon: info => <MaterialCommunityIcons name="settings-outline" size={info.size}
                                                                color={info.color}/>
                }}
            />
        </Tab.Navigator>
    );
}

export const AppNavigation = () => {
    const dispatch = useDispatch()

    // const periods = useSelector(state => state.period)
    // const plans = useSelector(state => state.plan)
    const wallet = useSelector(state => state.wallet)
    const current = useSelector(state => state.current)

    let restToSpend = () => {
        let sum = 0
        current.map(c => {
            if (c.plan > c.fact) sum += c.plan - c.fact
        })
        return sum
    }


    useEffect(() => {
        dispatch(getSettings())
        dispatch(getWallet())
        dispatch(getPlans())
        dispatch(getPeriods())
    }, [dispatch])

    const {theme, language} = useSelector(state => state.settings)
    // console.log(language)
    if (!theme) {
        return <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            backgroundColor: THEME.light.expense
        }}>
            {/*<FontAwesome5 name="redhat" size={60} color="black"/>*/}
            <Image source={require('../src/icon.png')} style={{
                width: 100, height: 100
            }}/>
            <Text style={{fontFamily: 'start-font', fontSize: 40}}>{'holey pocket'}</Text>
            {/*<AppText text={lang('private finance detective', language)}/>*/}
            <AppText text={lang('private finance detective', 'english')}/>

        </View>
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    options={({navigation})=>({
                        headerStyle: {
                            backgroundColor: THEME[theme].main
                        },
                        headerTitle: () => headerInfoPanel(wallet.sum, wallet.sum - restToSpend(), restToSpend(), theme, language),
                        headerRight: () =>
                            <View
                                style={{paddingRight: 20, paddingBottom: 0}}
                            >
                                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Savings', {theme, language, plans: restToSpend()})}>
                                    <View style={{alignItems: 'center'}}>
                                        <FontAwesome5 name="piggy-bank" size={24} color={THEME[theme].tabIcon}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                {/*<View style={{width: '100%', alignSelf: 'center'}}>*/}
                                {/*    <AppText text={wallet.saving} color='gray' otherStyle={{padding: 0}}/>*/}
                                {/*</View>*/}
                            </View>

                    })




                        // {
                        // headerStyle: {
                        //     backgroundColor: THEME[theme].main
                        // },
                        // headerTitle: () => headerInfoPanel(wallet.sum, wallet.sum - restToSpend(), restToSpend(), theme, language),
                        // headerLeft: () =>
                        //     <View style={{paddingLeft: 15, paddingBottom: 5}}>
                        //         <MaterialCommunityIcons name="menu" size={33} color={THEME[theme].empty}/>
                        //     </View>,
                        // headerLeft: () =>
                        //     <View
                        //         style={{paddingLeft: 20, paddingBottom: 0}}
                        //     >
                        //         <TouchableWithoutFeedback
                        //             onPress={
                        //                 // ()=>navigate('Savings')
                        //             }
                        //         >
                        //             <View style={{alignItems: 'center'}}>
                        //                 <FontAwesome5 name="piggy-bank" size={24} color={THEME[theme].tabIcon}/>
                        //             </View>
                        //         </TouchableWithoutFeedback>
                        //         {/*<View style={{width: '100%', alignSelf: 'center'}}>*/}
                        //         {/*    <AppText text={wallet.saving} color='gray' otherStyle={{padding: 0}}/>*/}
                        //         {/*</View>*/}
                        //     </View>
                    // }


                    }
                />
                <Stack.Screen name='Expenses' component={ExpensesScreen}/>
                <Stack.Screen name='Expenses Editing' component={ExpenseEditingScreen}/>
                <Stack.Screen name='Income Editing' component={IncomeEditingScreen}/>
                <Stack.Screen name='Category Editing' component={CategoryEditingScreen}/>
                <Stack.Screen name='Plan Editing' component={PlanEditingScreen}/>
                <Stack.Screen name='All time' component={AllTimeGraphicScreen}/>
                <Stack.Screen name='Savings' component={SavingsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    panel: {
        flexDirection: 'row',
        padding: 10
    },
    button: {
        margin: 10
    },
    infoUp: {
        textAlign: 'center',

    }
})
