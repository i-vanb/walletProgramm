import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Modal, Alert, Picker} from 'react-native'
import {THEME} from '../../theme'
import {inputNumberHandler} from "../../utilities/inputNumberHandler"
import {AppText} from "../ui/AppText"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AppButton} from "../ui/AppButton"

export const ChangeIncome = ({visible, onCancel, id, text, number, onSave}) => {
    const [name, setName] = useState(text || 'income')
    const [sum, setSum] = useState(number || 0)


    const saveHandler = () => {
        if (name.trim().length < 3) {
            Alert.alert(
                'Error!',
                `Minimal length 3 symbols. Now is ${
                    name.trim().length
                }.`
            )
        } else {
            onSave({name, sum})
            setName('income')
            setSum(0)
        }
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <MaterialCommunityIcons name="credit-card-plus-outline" size={80}
                                        color={THEME.color.green}/>
                <AppText text='income:' fontSize={24} otherStyle={{padding: 0}}/>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder='Enter income name'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                />
                <AppText text='sum:' fontSize={24} otherStyle={{padding: 0}}/>
                <TextInput
                    value={sum ? sum.toString() : ''}
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
                    onPress={onCancel}
                    />
                    <AppButton
                        title='Save'
                        color={THEME.color.green}
                        onPress={saveHandler}
                    />
                    {/*<Button*/}
                    {/*    title='Cancel'*/}
                    {/*    onPress={onCancel}*/}
                    {/*    color={THEME.color.cold}*/}
                    {/*/>*/}

                    {/*<Button title='  Save  ' onPress={saveHandler}/>*/}
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
