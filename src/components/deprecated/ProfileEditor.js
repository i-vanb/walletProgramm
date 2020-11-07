import React, {useState} from 'react'
import {View, TextInput, Text, StyleSheet, Keyboard} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {inputNumberHandler} from "../../utilities/inputNumberHandler";
import {THEME} from "../../theme";
import {AppButton} from "../ui/AppButton";
import {FontAwesome} from "@expo/vector-icons";
import {Calendar} from "../Calendar";
import {createPeriod, initExpenses, initIncomes} from "../../store/actions/period";
import {DB} from "../../db";

const getMonth = month => {
    let arr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    return arr[month]
}


export const ProfileEditor = props => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.profile.user)

    const [name, setName] = useState(user.name)
    const [sum, setSum] = useState(user.sum)
    const [adults, setAdults] = useState(user.adults || 1)
    const [children, setChildren] = useState(user.children || 0)
    const [isShowCalendar, setIsShowCalendar] = useState(false)
    const [date, setDate] = useState(0)
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)
    const [indexMonth, setIndexMonth] = useState('none')

    let titleDate = 'Choose the date'

    if(date) {
        titleDate = `${date.toString().length>1 ? date : '0'+date}.${month.toString().length>1 ? month : '0'+month}.${year}`
    }

    const pressHandler = () => {
        const payload = {...user, name, sum, adults, children, date, month, year, indexMonth}
        props.newUser? dispatch(createProfile(payload)) : dispatch(updateProfile(payload))
        props.submitChanges? props.submitChanges():null
        const currentTime = new Date()
        const currentTimeMs = Date.parse(new Date(Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())).toString())
        const profileTime = Date.parse(new Date(Date.UTC(year, Number.parseInt(indexMonth), date)).toString())
        if(currentTimeMs >= profileTime) {
            const name = getMonth(indexMonth)
            const dateS = date
            const monthS = Number.parseInt(indexMonth)
            const yearS = year
            const yearF = monthS === 11 ? yearS + 1 : yearS
            const monthF = monthS === 11 ? 0 : monthS + 1
            const daysInMonth = 32 - new Date(yearF, monthF, 32).getDate()
            const dateF = daysInMonth >= date ? date : daysInMonth
            const payload = {name, dateS, monthS, yearS, dateF, monthF, yearF}
            dispatch(createPeriod(payload))
            dispatch(initIncomes('incomes_' + name))
            dispatch(initExpenses('expenses_' + name))
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.title2}>Your name: </Text>
                <View style={styles.inputWrapper}>
                    <TextInput style={styles.textInput}
                               placeholderTextColor={THEME.color.smooth}
                               value={name} onChangeText={setName}
                               placeholder='Enter name'/>
                </View>
                <Text style={styles.title2}>Your month income: </Text>
                <View style={styles.inputWrapper}>
                    <TextInput style={styles.textInput} value={sum ? sum.toString() : ''}
                               placeholderTextColor={THEME.color.smooth}
                               onChangeText={text => inputNumberHandler(text, setSum)}
                               placeholder='Enter the number'/>
                </View>
                <Text style={styles.title2}>How many adults in your family: </Text>
                <View style={styles.numberWrap}>
                    <AppButton
                        title='-'
                        onPress={() => {
                            Keyboard.dismiss()
                            setAdults(adults - 1)
                        }}
                        disabled={adults === 1}
                    />
                    <Text style={styles.textInput}>{adults}</Text>
                    <AppButton
                        title='+'
                        onPress={() => {
                            Keyboard.dismiss()
                            setAdults(adults + 1)
                        }}
                        disabled={adults === 99}
                    />
                </View>
                <Text style={styles.title2}>How many children in your family: </Text>
                <View style={styles.numberWrap}>
                    <AppButton
                        title='-'
                        onPress={() => {
                            Keyboard.dismiss()
                            setChildren(children - 1)
                        }}
                        disabled={children === 0}
                    />
                    <Text style={styles.textInput}>{children}</Text>
                    <AppButton
                        title='+'
                        onPress={() => {
                            Keyboard.dismiss()
                            setChildren(children + 1)
                        }}
                        disabled={children === 99}
                    />
                </View>
                <Text style={styles.title2}>From which date do you wanna start to count:</Text>

                {isShowCalendar
                    ? <Calendar
                        onBack={()=>setIsShowCalendar(false)}
                        setDate={setDate} setMonth={setMonth} setYear={setYear}
                        setIndexMonth={setIndexMonth}
                    />
                    :
                    <>
                    <Text style={{...styles.textInput, color: THEME.color.smooth}}>
                        {titleDate}
                        {/*{date*/}
                        {/*    ? `${date}.${month}.${year}`*/}
                        {/*    : 'Choose date'*/}
                        {/*}*/}
                    </Text>
                    <AppButton
                        onPress={()=>{setIsShowCalendar(true)}}
                        title={<FontAwesome name="calendar" size={24} color="black" />}
                    />
                    </>
                }

                {!isShowCalendar && <View style={styles.sbmtBtn}>
                    <AppButton
                        title='update profile'
                        onPress={pressHandler}
                        disabled={!name || !sum || !adults || !date}
                        //   || start === 'Choose the date'
                    />
                </View>}
            </View>
            <AppButton
                title='Cancel'
                onPress={props.onGetBack}
                buttonStyle={styles.buttonBack}
                // textStyle={styles.textBtn}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: THEME.color.light
    },
    numberWrap: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-around',
        paddingBottom: 10
    },
    title: {
        fontSize: 25,
        fontFamily: 'bitter-bold',
        padding: 20,
        color: THEME.color.dark
    },
    sbmtBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    inputWrapper: {
        minWidth: '80%'
    },
    textInput: {
        fontFamily: 'bitter-regular',
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 10,
        color: THEME.color.warm
    },
    title2: {
        fontFamily: 'bitter-regular',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10,
        color: THEME.color.dark
    },
    buttonBack: {
        borderRadius: 0,
        paddingBottom: 20
    },
    textBtn: {
        color: 'black'
    }
})
