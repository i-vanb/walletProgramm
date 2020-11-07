import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Picker, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {THEME} from '../theme'
import {inputNumberHandler} from "../utilities/inputNumberHandler"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AppText} from "../components/ui/AppText"
import {AppButton} from "../components/ui/AppButton"
import {useDispatch} from "react-redux"
import {
    deleteExpense, getExpense
} from "../store/actions/expense"
import {changeWalletSum} from "../store/actions/wallet"
import {
    addCurrentCategory,
    changeCurrentCategoryPlan,
    deleteCurrentCategory
} from "../store/actions/current"
import {addCategory, deleteCategory, getCategories} from "../store/actions/category"
import {deletePlan, getPlans} from "../store/actions/plan"

export const CategoryEditingScreen = ({navigation, route}) => {
    const dispatch = useDispatch()

    const [category, setCategory] = useState(route.params.name)
    const [name, setName] = useState('')
    const [sum, setSum] = useState(route.params.plan !== 0 ? route.params.plan : '')


    navigation.setOptions({
        headerStyle: {
            backgroundColor: THEME.color.dark
        },
        headerLeft: () => {
        },
        headerTitle: () =>
            <View>
                <Text style={{
                    fontFamily: 'bitter-regular',
                    fontSize: 18,
                    color: THEME.color.yellow,
                    textAlign: 'right'
                }}>Category Editor</Text>
            </View>
    })


    const categoryName =
        <Picker
            itemStyle={{
                fontFamily: 'bitter-regular',
                color: THEME.color.dark,
            }}
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
            {route.params.categories.map(category => {
                return <Picker.Item label={category.name} value={category.name} key={category.id}/>
            })}
            <Picker.Item label='Create new category' value='Create new category'/>
        </Picker>

    const cancelHandler = () => {
        navigation.goBack()
    }



    // const removeHandler = () => {
    //     Alert.alert(
    //         'Removing category',
    //         'Its not working button. Dont use it yet',
    //         [
    //             {
    //                 text: 'cancel',
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'remove', style: 'destructive', onPress: () => {
    //                     const expenses = dispatch(getExpense(route.params.period))
    //                     expenses.map(e => dispatch(deleteExpense(e.id)))
    //                     const planned = dispatch(getPlans())
    //                     planned.map(p => {
    //                         if (category) dispatch(deletePlan(p.id))
    //                     })
    //                     dispatch(changeWalletSum(route.params.sum + route.params.fact))
    //                     dispatch(deleteCurrentCategory(route.params.period, route.params.id))
    //                     const categoryToDelete = dispatch(getCategories())
    //                     categoryToDelete.map(c => {
    //                         if (category === c.name) dispatch(deleteCategory(c.id))
    //                     })
    //                     navigation.goBack()
    //                 }
    //             }
    //         ],
    //         {cancelable: false}
    //     )
    // }

    const saveHandler = () => {
        if (category === 'Create new category' && name.trim().length < 3) {
            return Alert.alert('Error!', `Minimum three symbols.`)
        }
        if (category === 'Create new category') {
            dispatch(addCategory(name, 'lock-outline', 'MaterialCommunityIcons'))
            dispatch(addCurrentCategory(route.params.period, name, sum ? sum : 0, 0, 'lock-outline', 'MaterialCommunityIcons'))
        } else {
            let categoryPlanSum = 0
            route.params.plans.map(p => {
                if (p.category === category) {
                    categoryPlanSum += p.sum
                }
            })
            route.params.categories.map(c => {
                if (category === c.name) {
                    dispatch(changeCurrentCategoryPlan(route.params.period, c.id, sum<categoryPlanSum ? categoryPlanSum : sum))
                }
            })
        }
        navigation.goBack()
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.wrap}>
                {/*<View style={{position: 'absolute', right: 20, top: 20}}>*/}
                {/*    <TouchableWithoutFeedback onPress={removeHandler}>*/}
                {/*        <MaterialCommunityIcons name="credit-card-remove-outline" size={35}*/}
                {/*                                color={THEME.color.red}/>*/}
                {/*    </TouchableWithoutFeedback>*/}
                {/*</View>*/}

                <MaterialCommunityIcons name="credit-card-multiple-outline" size={80}
                                        color={THEME.color.green}/>
                <View style={{flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%', alignItems: 'center'}}>
                    <AppText text='Category:' fontSize={18} otherStyle={{padding: 0}}/>
                    {categoryName}
                </View>

                {/*{categoryName}*/}


                {category === 'Create new category' && <>
                    <AppText text='Enter the name of new category:' fontSize={18} otherStyle={{padding: 0}}/>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={name ? styles.inputFilled : styles.input}
                        placeholder='Enter expense name'
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={64}
                    /></>
                }
                <AppText text='Enter the money you plan to spend:' fontSize={18} otherStyle={{padding: 0}}/>
                <TextInput
                    value={sum.toString()}
                    onChangeText={text => inputNumberHandler(text, setSum)}
                    style={sum !=='' ? styles.inputFilled : styles.input}
                    placeholder='Enter the sum'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardAppearance='dark'
                    keyboardType='numeric'
                />
                <View style={styles.buttons}>
                    <AppButton
                        title='Cancel'
                        color={THEME.color.dark}
                        onPress={cancelHandler}
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
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 100,
        alignItems: 'center',
        backgroundColor: THEME.color.yellow,
    },
    // input: {
    //     padding: 5,
    //     borderBottomColor: THEME.color.dark,
    //     borderBottomWidth: 1,
    //     width: '80%',
    //     color: THEME.color.dark,
    //     marginBottom: 30
    // },
    input: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        backgroundColor: THEME.color.milk,
        marginBottom: 30,
        marginTop: 20
    },
    inputFilled: {
        padding: 5,
        width: '80%',
        color: THEME.color.dark,
        fontSize: 18,
        borderBottomColor: THEME.color.dark,
        borderBottomWidth: .7,
        marginBottom: 30,
        marginTop: 20
    },

    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    picker: {
        //     // height: 50,
        //     width: '100%',
        //     // fontSize: 90,
        //     fontFamily: 'bitter-regular',
        //     color: THEME.color.dark,
        //     textAlign: 'right',
        //     // paddingBottom: 40

        flex: 1,
        // height: 50,
        // backgroundColor: THEME.color.smooth,
        // width: '80%',
        fontSize: 18,
        fontFamily: 'bitter-regular',
        color: THEME.color.dark,
        // paddingBottom: 40
    }

})
