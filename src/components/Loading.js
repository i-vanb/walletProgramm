import React from 'react'
import {View, Dimensions, Text, Image} from 'react-native'
import {AppText} from "./ui/AppText"
import {lang} from "../utilities/lang"
import {THEME} from "../theme"
import { FontAwesome5 } from '@expo/vector-icons'


const {width} = Dimensions.get('window')
const wrapSize = width/5
const size = wrapSize / 1.3
const strokeWidth = size / 15
const radius = (size - strokeWidth) / 2

export const Loading = ({language = 'english', theme='light'}) => {

        return (
        <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            backgroundColor: THEME.light.expense
        }}>
            {/*<FontAwesome5 name="redhat" size={60} color="black" />*/}
            <Image source={require('../icon.png')} style={{
                width: 100, height: 100
            }}/>
            <Text style={{fontFamily: 'start-font', fontSize: 40}}>{'holey pocket'}</Text>
            <AppText text={lang('private finance detective', language)}/>
            <AppText text={lang('LOADING...', language)} otherStyle={{padding: 20}}/>

        </View>
    )
}
