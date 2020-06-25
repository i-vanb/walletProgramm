import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {THEME} from "../theme";
import {ProfileEditor} from "./ProfileEditor";
import {AppButton} from "./ui/AppButton";
import {DB} from "../db";

export const Welcome = () => {
    const [isCreating, setIsCreating] = useState(false)
    // console.log('now date',new Date(Date.UTC(2020, 4, 19, 0, 0)))
    if(isCreating) {
        return <View style={styles.wrapper}><ProfileEditor onGetBack={()=>setIsCreating(false)} newUser={true}/></View>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Application</Text>
            <Text style={styles.title2}>Money love counting!</Text>
            <Text style={styles.text}>let's count it now to stop floating money from our holey pockets without, as it
                usual happens, any reason for that</Text>
            <Text style={styles.title2}>Make your own goals and reach them!</Text>
            <Text style={styles.text}>What do you want to save your money for? Vacation after six month? Car in a year?
                Education for you or your children? Or may be the exact shoes you are dreaming about!</Text>
            <Text style={styles.title2}>It is your own money!</Text>
            <Text style={styles.text}>Never forget that! Only you can spend it and only you can save it too. A lot of
                people wait better times for it, but the truth is - there is never better time for anything. </Text>
            <Text style={styles.title2}>Start right away!</Text>
            <Text style={styles.text}>Create profile and start follow your expenses every day.</Text>
            <AppButton onPress={()=>setIsCreating(true)} title='Create Profile' />
        </View>
    )}


const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        paddingTop: 30,
        backgroundColor: THEME.color.light
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingTop: 40,
        backgroundColor: THEME.color.light,
        height: 1500
    },
    title: {
        fontSize: 25,
        fontFamily: 'bitter-bold',
        padding: 20,
        color: THEME.color.dark
    },
    title2: {
        fontFamily: 'bitter-regular',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10,
        color: THEME.color.warm
    },
    text: {
        fontFamily: 'bitter-regular',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 15,
        color: THEME.color.dark
    }
})
