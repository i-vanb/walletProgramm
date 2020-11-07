import {DB} from "../db";
import {getDateInMs} from "./getTodayInMS";
import {THEME} from "../theme";
import {NativeModules, Platform} from "react-native";

const periods = [
    {id: 1, name: 'january_2020', start: 0, end: 8000},
    {id: 2, name: 'february_2020', start: 8000, end: 7000},
    {id: 3, name: 'march_2020', start: 7000, end: 3000},
    {id: 4, name: 'april_2020', start: 3000, end: 5000},
    {id: 5, name: 'may_2020', start: 5000, end: 9000},
    {id: 6, name: 'june_2020', start: 9000, end: 12000},
    {id: 7, name: 'july_2020', start: 12000, end: 4000},
    {id: 8, name: 'august_2020', start: 4000, end: null}, // 10 000
]

const incomes = [
    {name: 'salary', sum: 38000, date: getDateInMs(2020, 0, 9), period: 'january_2020'},
    {name: 'prize', sum: 20000, date: getDateInMs(2020, 0, 18), period: 'january_2020'},
    {name: 'salary', sum: 55000, date: getDateInMs(2020, 0, 25), period: 'january_2020'},

    {name: 'salary', sum: 43000, date: getDateInMs(2020, 1, 7), period: 'february_2020'},
    {name: 'salary', sum: 58000, date: getDateInMs(2020, 1, 25), period: 'february_2020'},

    {name: 'salary', sum: 37000, date: getDateInMs(2020, 2, 10), period: 'march_2020'},
    {name: 'salary', sum: 43000, date: getDateInMs(2020, 2, 23), period: 'march_2020'},

    {name: 'salary', sum: 61000, date: getDateInMs(2020, 3, 5), period: 'april_2020'},
    {name: 'selling', sum: 29000, date: getDateInMs(2020, 3, 12), period: 'april_2020'},
    {name: 'salary', sum: 55000, date: getDateInMs(2020, 3, 20), period: 'april_2020'},

    {name: 'salary', sum: 37000, date: getDateInMs(2020, 4, 10), period: 'may_2020'},
    {name: 'salary', sum: 67000, date: getDateInMs(2020, 4, 25), period: 'may_2020'},

    {name: 'selling', sum: 30000, date: getDateInMs(2020, 5, 4), period: 'june_2020'},
    {name: 'salary', sum: 38000, date: getDateInMs(2020, 5, 9), period: 'june_2020'},
    {name: 'salary', sum: 58000, date: getDateInMs(2020, 5, 22), period: 'june_2020'},

    {name: 'salary', sum: 28000, date: getDateInMs(2020, 6, 2), period: 'july_2020'},
    {name: 'salary', sum: 56000, date: getDateInMs(2020, 6, 23), period: 'july_2020'},
    {name: 'insurance', sum: 16000, date: getDateInMs(2020, 6, 29), period: 'july_2020'},

    {name: 'salary', sum: 48000, date: getDateInMs(2020, 7, 9), period: 'august_2020'},
    {name: 'salary', sum: 51000, date: getDateInMs(2020, 7, 23), period: 'august_2020'},
]

export const testData = async () => {
    await DB.createWallet()
    await DB.changeWalletSum(10000)
    await DB.createSettings('english')

    THEME.categories.map(async c => await DB.addCategory(c.name, c.icon, c.iconLibrary))

    periods.map(async p => {
        await DB.addPeriod(p.name)
        await DB.changePeriodStart(p.name, p.start)
        if(p.end > 0) {
            await DB.changePeriodEnd(p.name, p.end)
        }
        await DB.initCurrentPeriod(p.name)
        THEME.categories.map(async c => await DB.addCurrentCategory(p.name, c.name, 0, 0, c.icon, c.iconLibrary))
    })

    incomes.map(async i => await DB.addIncome(i.name, i.sum, i.date, i.period))
    return periods[periods.length-1]


}

export const testDeleteData = () => {


}
