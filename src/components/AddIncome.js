import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Modal, Alert, Picker} from 'react-native'
import {THEME} from '../theme'
import {inputNumberHandler} from "../utilities/inputNumberHandler"
import {AppText} from "./ui/AppText"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AppButton} from "./ui/AppButton"

export const AddIncome = ({visible, onCancel, text, number, onSave}) => {
    const [name, setName] = useState(null)
    const [sum, setSum] = useState(null)

    const saveHandler = () => {
        if(!name && !text) {
            let name = 'income'
            onSave({name, sum})
            setSum(null)
        } else if (!sum) {
            Alert.alert(
                'Error!',
                'You need to fill sum field.'
            )
        } else if (name && name.trim().length < 3) {
            Alert.alert(
                'Error!',
                `Minimal length 3 symbols. Now is ${
                    name.trim().length
                }.`
            )
        } else {
            onSave({name, sum})
            setName(null)
            setSum(null)
        }
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <MaterialCommunityIcons name="credit-card-plus-outline" size={80}
                                        color={THEME.color.green}/>
                <AppText text='income:' fontSize={24} otherStyle={{padding: 0}}/>
                <TextInput
                    value={name===null ? text? text : 'income' : name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder='Enter income name'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                />
                <AppText text='sum:' fontSize={24} otherStyle={{padding: 0}}/>
                <TextInput
                    value={sum === null ? number? number.toString(): '' : sum.toString()}
                    onChangeText={text => inputNumberHandler(text, setSum)}
                    style={styles.input}
                    placeholder='Enter money earned'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={12}
                />
                <View style={styles.buttons}>
                    <AppButton
                    title='Cancel'
                    color={THEME.color.dark}
                    onPress={()=> {
                        setSum(null)
                        setName(null)
                        onCancel()
                    }}
                    textStyle={{color: THEME.color.yellow}}
                    />
                    <AppButton
                        title='Save'
                        color={THEME.color.green}
                        onPress={saveHandler}
                        textStyle={{color: THEME.color.dark}}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        // paddingVertical: 100,
        alignItems: 'center',
        backgroundColor: THEME.color.yellow,
    },
    input: {
        padding: 5,
        borderBottomColor: THEME.color.green,
        borderBottomWidth: 1,
        width: '80%',
        color: THEME.color.dark,
        marginBottom: 30
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
