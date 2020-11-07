import React, {useState} from 'react'
import {ScrollView, Button, View, Image} from 'react-native'
import {getDateInMs} from "../utilities/getTodayInMS";
import {THEME} from "../theme"
import {useSelector} from "react-redux"
import {AppText} from "../components/ui/AppText";
import {lang} from "../utilities/lang";
import { MaterialIcons } from '@expo/vector-icons';


export const GoalsScreen = () => {
    const {theme, language} = useSelector(state => state.settings)

    return (
        <View style={{backgroundColor: THEME[theme].back, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{
                backgroundColor: THEME[theme].expense,
                width: '80%',
                padding: 30,
                borderRadius: 15,
                flexDirection: 'row',
                justifyContent: 'center'
            }}>

                <MaterialIcons name="star" size={24} color={THEME[theme].back}/>
                <AppText text={lang('Coming up soon!', language)} color={THEME[theme].back}/>
                <MaterialIcons name="star" size={24} color={THEME[theme].back}/>
            </View>
        </View>
    )
}
