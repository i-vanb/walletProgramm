import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {THEME} from "../../theme";

export const ExpenseItem = ({id, title, category, sum, onRemove, onOpen, date}) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            // onPress={() => onOpen(id)}
            // onLongPress={onRemove.bind(null, id)}
        >
            <View style={styles.item}>
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.wrapper}>
                    <View style={styles.wrapperSum}>
                        <Text style={styles.sum}>{sum}</Text>
                    </View>
                    {/*<Text>{date}</Text>*/}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: THEME.color.light,
        borderRadius: 5,
        marginBottom: 5,
        flex: 1,
        backgroundColor: THEME.color.smooth
    },
    title: {
        flex: 7,
        fontFamily: 'bitter-regular',
        fontSize: 15
    },
    wrapperSum: {
        backgroundColor: THEME.color.dark,
        borderRadius: 15,
        // width: '20%'
    },
    wrapper: {
        flex: 3
    },
    sum: {
        // flex: 1,
        fontFamily: 'bitter-regular',
        fontSize: 15,
        color: THEME.color.light,
        textAlign: 'center'

    },

    category: {
        flex: 2,
        textAlign: 'left',
        fontFamily: 'bitter-regular',
        fontSize: 15,
        color: THEME.color.light,
        paddingRight: 10
    }
})
