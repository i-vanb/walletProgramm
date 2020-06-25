import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Modal, Alert, Picker} from 'react-native'
import {THEME} from '../theme'
import {inputNumberHandler} from "../utilities/inputNumberHandler";

export const AddIncome = ({visible, onCancel, text, number, onSave}) => {
    const [name, setName] = useState(text || 'income')
    const [sum, setSum] = useState(number || 0)


    const saveHandler = () => {
        if (name.trim().length < 3) {
            Alert.alert(
                'Ошибка!',
                `Минимальная длинна названия 3 символа. Сейчас ${
                    name.trim().length
                } символов.`
            )
        } else {
            let time = Date.now()
            onSave(name, sum, time)
            setName('income')
            setSum(0)
        }
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                {/*<Text style={styles.title}>Category: </Text>*/}
                {/*{categoryName}*/}
                <Text style={styles.title}>Income: </Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder='Enter income name'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                />
                <Text style={styles.title}>Sum: </Text>
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
                    <Button
                        title='Cancel'
                        onPress={onCancel}
                        color={THEME.color.cold}
                    />
                    <Button title='  Save  ' onPress={saveHandler}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 5,
        borderBottomColor: THEME.color.warm,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        paddingTop: 15,
        color: THEME.color.dark,
        fontSize: 20
        // justifyContent: 'flex-start'
    },
    picker: {
        height: 50,
        width: 200,
        color: THEME.color.warm,
        fontSize: 20
    }
})
