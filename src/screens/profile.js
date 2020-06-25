import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {useSelector} from "react-redux";
import {ProfileEditor} from "../components/ProfileEditor";
import {THEME} from "../theme";
import {AppButton} from "../components/ui/AppButton";

export const ProfileScreen = () => {
    const profile = useSelector(state => state.profile.user)
    const [changing, setChanging] = useState(false)
    const date = `${profile.date.toString().length>1 ? profile.date : '0'+profile.date}.${profile.month.toString().length>1 ? profile.month : '0'+profile.month}.${profile.year}`

    if(changing) {
        return <ScrollView><ProfileEditor submitChanges={() => setChanging(false)} onGetBack={() => setChanging(false)}/></ScrollView>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile settings</Text>
            <Text style={styles.title2}>Name: {profile.name}</Text>
            <Text style={styles.title2}>Income: {profile.sum}</Text>
            <Text style={styles.title2}>Adults: {profile.adults}</Text>
            <Text style={styles.title2}>Children: {profile.children}</Text>
            <Text style={styles.title2}>Period starts from: {date}</Text>
            <AppButton title='change' onPress={()=>{setChanging(true)}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: THEME.color.light
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
