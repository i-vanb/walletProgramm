import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Modal, Alert, Picker} from 'react-native'
import {THEME} from '../../theme'
import {inputNumberHandler} from "../../utilities/inputNumberHandler"
import {AppText} from "../ui/AppText"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AppButton} from "../ui/AppButton"

export const AddIncome = ({visible, onCancel, text, number, onSave}) => {

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
