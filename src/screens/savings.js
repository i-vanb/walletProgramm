import React, {useState} from 'react'
import {View, Dimensions, TouchableWithoutFeedback, Alert, TextInput, StyleSheet, Modal} from 'react-native'
import Svg, {Circle, Path, Text, Rect, Line} from 'react-native-svg'
import {AntDesign, FontAwesome5, MaterialCommunityIcons, SimpleLineIcons, FontAwesome} from '@expo/vector-icons';

import {THEME} from "../theme";
import {AppText} from "../components/ui/AppText";
import {lang} from "../utilities/lang";
import {getUniqueKey} from "../utilities/getUniqueKey";
import {numToString} from "../utilities/numToString";
import {useDispatch, useSelector} from "react-redux";
import {changeWalletSaving, changeWalletSum} from "../store/actions/wallet";
import {inputNumberHandler} from "../utilities/inputNumberHandler";
import {AppButton} from "../components/ui/AppButton";

export const SavingsScreen = ({navigation, route}) => {
    const {theme, language, plans} = route.params
    const [currentSum, setCurrentSum] = useState(0)
    const [isModal, setIsModal] = useState(false)

    const dispatch = useDispatch()
    const wallet = useSelector(state => state.wallet)

    const addSavingsHandler = () => {
        if (currentSum > wallet.sum) {
            return Alert.alert(lang('You are trying to spend more then you have!', language), lang(`Check your balance`, language))
        }
        if (!currentSum > 0) {
            return Alert.alert(lang('Error!', language), lang('You need to fill sum', language))
        }
        dispatch(changeWalletSaving(wallet.saving + currentSum))
        dispatch(changeWalletSum(wallet.sum - currentSum))
        setIsModal(false)
        setCurrentSum(0)
    }

    const removeSavingsHandler = () => {
        if (currentSum > wallet.saving) {
            return Alert.alert(lang('You are trying to take more then you have!', language), lang(`Check your balance`, language))
        }
        if (!currentSum > 0) {
            return Alert.alert(lang('Error!', language), lang('You need to fill sum', language))
        }
        dispatch(changeWalletSaving(wallet.saving - currentSum))
        dispatch(changeWalletSum(wallet.sum + currentSum))
        setIsModal(false)
        setCurrentSum(0)

    }


    navigation.setOptions({
        title: lang('Savings', language),
        headerTitleStyle: {
            color: THEME[theme].title,
        },
        headerStyle: {
            backgroundColor: THEME[theme].main,
        },
        headerLeft: () => <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{paddingLeft: 10}}>
                <AntDesign name="caretleft" size={24} color={THEME[theme].title}/>
            </View>
        </TouchableWithoutFeedback>,
    })

    const [color, setColor] = useState(THEME[theme].expense)

    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: THEME[theme].back}}>

            <FontAwesome5 name="piggy-bank" size={34} color={THEME[theme].expense} style={{paddingTop: 20}}/>
            <AppText text={lang('Savings', language)} color={THEME[theme].expense} fontSize={20}
                     otherStyle={{paddingVertical: 10}}/>
            <TouchableWithoutFeedback
                onPressIn={() => setColor('#bda23f')}
                onPress={() => setIsModal(true)}
                onPressOut={() => setColor(THEME[theme].expense)}
            >
                <View style={{
                    backgroundColor: color,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '80%',
                    height: '10%',
                    borderRadius: 15,
                    justifyContent: 'space-around'
                }}>
                    <AppText text={numToString(wallet.saving)} color={THEME[theme].back} fontSize={30}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={{width: '80%', flexDirection: 'row', paddingTop: 20}}>
                <AppText text={lang('Current account', language)} color={THEME[theme].empty} fontSize={18}/>
                {/*<AppText text={numToString(wallet.saving)} color={THEME[theme].title} fontSize={20}/>*/}
                <AppText text={numToString(wallet.sum)} color={THEME[theme].subtitle} fontSize={18}/>
            </View>
            <View style={{width: '80%', flexDirection: 'row', paddingTop: 10}}>
                <AppText text={lang('Current plans', language)} color={THEME[theme].empty} fontSize={18}/>
                {/*<AppText text={numToString(wallet.saving)} color={THEME[theme].title} fontSize={20}/>*/}
                <AppText text={numToString(plans)} color={THEME[theme].subtitle} fontSize={18}/>
            </View>
            {/*{!wallet.saving &&*/}
            <View style={{width: '80%', paddingTop: 20}}>
                <View style={{alignItems: 'center'}}>
                    <MaterialCommunityIcons name="information-outline" size={24} color={THEME[theme].title}/>
                </View>
                <View>
                    <AppText
                        text={lang('Try to save some money every month. Take your savings on different account or save it in cash. The main thing you must think of - is not thinking of them! Give it time and your savings will grown.', language)}
                        color={THEME[theme].empty} fontSize={16}/>
                </View>
            </View>
            {/*}*/}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.")
                }}
            >
                <View style={styles.centeredView}>
                    <TextInput
                        value={currentSum ? currentSum.toString() : ''}
                        onChangeText={text => inputNumberHandler(text, setCurrentSum)}
                        style={currentSum ? styles.inputFilled : styles.input}
                        placeholder={lang('Enter the sum', language)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        keyboardType='numeric'
                        maxLength={9}
                    />

                    <View style={{flexDirection: 'row', width: '80%', marginTop: 10}}>
                        <TouchableWithoutFeedback onPress={removeSavingsHandler}>
                            <View style={{
                                backgroundColor: THEME[theme].warning,
                                flex: 1,
                                justifyContent: 'center',
                                marginRight: 5,
                                borderRadius: 5
                            }}>
                                <AppText text={lang('Withdraw money', language)} fontSize={16}
                                         color={THEME[theme].title}/>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={addSavingsHandler}>
                            <View style={{
                                backgroundColor: THEME[theme].expense,
                                flex: 1,
                                justifyContent: 'center',
                                marginLeft: 5,
                                borderRadius: 5
                            }}>
                                <AppText text={lang('Transfer to savings', language)} fontSize={16}
                                         color={THEME[theme].back}/>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    <TouchableWithoutFeedback onPress={()=> {
                        setIsModal(false)
                        setCurrentSum(0)
                    }}>
                        <View style={{
                            marginTop: 10,
                            width: '80%',
                            height: '10%',
                            backgroundColor: THEME.color.dark,
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                            <AppText text={lang('Cancel', language)} color={THEME[theme].title} fontSize={20}/>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </Modal>

        </View>
    )

}

const styles = StyleSheet.create({
    buttons: {
        width: '80%',
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
        borderRadius: 5
    },
    inputFilled: {
        padding: 5,
        width: '80%',
        color: THEME["dark"].expense,
        fontSize: 18,
        borderBottomColor: THEME.color.dark,
        borderBottomWidth: .7,
        borderRadius: 5
    },
    centeredView: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
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
})
