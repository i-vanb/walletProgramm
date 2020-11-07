import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet, TextInput, TouchableNativeFeedback, Switch, Picker} from 'react-native'

import {AppButton} from "../components/ui/AppButton";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage, changeTheme} from "../store/actions/settings";
import {AppText} from "../components/ui/AppText";
import {THEME} from "../theme";
import {lang} from "../utilities/lang";

export const ProfileScreen = () => {
    const settings = useSelector(state => state.settings)

    const [isEnabled, setIsEnabled] = useState(settings.theme === 'dark' && true)
    const [appLanguage, setAppLanguage] = useState(settings.language)

    const dispatch = useDispatch()

    const toggleThemeSwitch = () => {
        if (isEnabled) {
            dispatch(changeTheme('light'))
        } else {
            dispatch(changeTheme('dark'))
        }
        setIsEnabled(previousState => !previousState)
    }


    return (
        <View style={{...styles.container, flex: 1, backgroundColor: THEME[settings.theme].back}}>
            <AppText text={lang('SETTINGS', settings.language)} fontSize={20} color={THEME[settings.theme].title} otherStyle={{paddingVertical: 40}}/>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, borderBottomWidth: .5, marginHorizontal: 40}}>
                <AppText color={THEME[settings.theme].title} text={lang('Dark mode', settings.language)} fontSize={18}/>
                <Switch
                    trackColor={{false: THEME.light.empty, true: THEME.dark.active}}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleThemeSwitch}
                    value={isEnabled}
                />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: .5, marginHorizontal: 30}}>

                <View style={{flex: 1}}>
                    <AppText fontSize={20} color={THEME[settings.theme].title} text={lang('Language', settings.language)}/>
                </View>

                <View style={{flex: 2}}>
                    <Picker
                        mode='dropdown'
                        selectedValue={appLanguage}
                        // style={styles.picker}
                        style={{
                            color: THEME[settings.theme].subtitle
                        }}
                        itemStyle={{
                            color: THEME[settings.theme].title,
                            fontFamily: 'bitter-regular',
                            fontSize: 18
                        }}
                        onValueChange={(itemValue, itemIndex) => {
                            setAppLanguage(itemValue)
                            dispatch(changeLanguage(itemValue))
                        }}>
                        <Picker.Item label={lang('english', settings.language)} value='english'/>
                        <Picker.Item label={lang('russian', settings.language)} value='russian'/>
                    </Picker>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    // picker: {
    //     flex: 1,
    //     // height: 50,
    //     // backgroundColor: THEME.color.smooth,
    //     // width: '80%',
    //     fontSize: 18,
    //     fontFamily: 'bitter-regular',
    //     color: THEME.color.dark,
    //     // paddingBottom: 40
    // }
})
