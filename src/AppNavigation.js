import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect, useState, useCallback} from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {HomeScreen} from "./screens/home"
import {ProfileScreen} from "./screens/profile"
import {GoalsScreen} from "./screens/goals"
import {ExpensesScreen} from "./screens/expenses"
import {loadProfile} from "./store/actions/profile";

import {Welcome} from "./components/Welcome";
import {THEME} from "./theme";
import {
    createPeriod,
    endPeriod,
    initExpenses,
    initIncomes,
    loadExpenses,
    loadIncomes,
    loadPeriods, makeExpense, makeIncome
} from "./store/actions/period";
import {DB} from "./db";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
        </Stack.Navigator>
    )
}

function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

function GoalsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Goals' component={GoalsScreen}/>
        </Stack.Navigator>
    )
}

function ExpensesNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Expenses' component={ExpensesScreen}/>
        </Stack.Navigator>
    )
}

export const AppNavigation = () =>


        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeNavigator}/>
                <Tab.Screen name="Expenses" component={ExpensesNavigator}/>
                <Tab.Screen name="Goals" component={GoalsNavigator}/>
                <Tab.Screen name="Profile" component={ProfileNavigator}/>
            </Tab.Navigator>
        </NavigationContainer>

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
