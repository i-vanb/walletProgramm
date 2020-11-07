import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Modal, Alert, Picker} from 'react-native'
import {THEME} from '../../theme'
import {inputNumberHandler} from "../../utilities/inputNumberHandler";

export const EditExpense = ({visible, onCancel, text, number, title, onSave}) => {
    const [name, setName] = useState(text || '')
    const [sum, setSum] = useState(number || '')
    const [category, setCategory] = useState(title || 'home')

    const saveHandler = () => {
        if (name.trim().length < 3) {
            Alert.alert(
                'Ошибка!',
                `Минимальная длинна названия 3 символа. Сейчас ${
                    name.trim().length
                } символов.`
            )
        } else {
            onSave(category, name, sum)
            setName('')
            setSum('')
            setCategory('home')
        }
    }

    // const categoryName =
    //     <Picker
    //         selectedValue={category}
    //         style={styles.picker}
    //         onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
    //         <Picker.Item label="Home" value="home"/>
    //         <Picker.Item label="Food" value="food"/>
    //         <Picker.Item label="Car" value="car"/>
    //         <Picker.Item label="Credit" value="credit"/>
    //         <Picker.Item label="Service" value="service"/>
    //         <Picker.Item label="Fun" value="fun"/>
    //     </Picker>

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <Text style={styles.title}>Category: </Text>



                <Text style={styles.title}>Expense: </Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder='Enter expense name'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                />
                <Text style={styles.title}>Sum: </Text>
                <TextInput
                    value={sum ? sum.toString() : ''}
                    onChangeText={text => inputNumberHandler(text, setSum)}
                    style={styles.input}
                    placeholder='Enter money spending'
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
