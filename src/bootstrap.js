import * as Font from 'expo-font'
import {DB} from "./db"

const getMonth = month => {
    let arr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    return arr[month]
}

export async function bootstrap() {
    try {
        await Font.loadAsync({
            'bitter-bold': require('../assets/fonts/Bitter-Bold.ttf'),
            'bitter-regular': require('../assets/fonts/Bitter-Regular.ttf')
        })



        // await DB.deleteProfile()
        // await DB.deletePeriods()

        await DB.initProfile()
        await DB.initPeriods()

        const period = await DB.getLastPeriod()
        const profile = await DB.getProfile()

        if (profile) {
            let name, dateS, monthS, yearS, dateF, monthF, yearF
            const currentTime = new Date()
            const currentTimeMs = Date.parse(new Date(Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())).toString())
            if (period.length) {
                console.log('period.length', 'true')
                let periodEndTimeMs = Date.parse(new Date(Date.UTC(period[0].yearF, period[0].monthF, period[0].dateF)).toString())
                // console.log(new Date(Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())))
                // console.log('date from period',new Date(Date.UTC(period[0].yearF, period[0].monthF, period[0].dateF)))
                // console.log(period)
                // console.log(currentTimeMs >= periodEndTimeMs)
                if(currentTimeMs >= periodEndTimeMs) {
                    console.log('It is time for creating')
                    name = getMonth(period[0].monthF)
                    await DB.finishPeriod(period[0].id)
                    yearS = period[0].yearF
                    monthS = period[0].monthF
                    dateS = period[0].dateF
                    yearF = monthS === 11 ? yearS + 1 : yearS
                    monthF = monthS === 11 ? 0 : monthS + 1
                    const daysInMonth = 32 - new Date(yearF, monthF, 32).getDate()
                    dateF = daysInMonth >= profile.date ? profile.date : daysInMonth
                    await DB.finishPeriod(period[0].id)
                    await DB.createPeriod({name, dateS, monthS, yearS, dateF, monthF, yearF})
                    await DB.initIncomes('incomes_' + name)
                    await DB.initExpenses('expenses_' + name)
                }
            } else {
                console.log('period.length', 'false')
                let profileStartTimeMs = Date.parse(new Date(Date.UTC(profile.year, profile.indexMonth, profile.date)).toString())
                if(currentTimeMs >= profileStartTimeMs) {
                    console.log('It is time for creating')
                    name = getMonth(profile.indexMonth)
                    yearS = profile.year
                    monthS = profile.indexMonth
                    dateS = profile.date
                    yearF = monthS === 11 ? yearS + 1 : yearS
                    monthF = monthS === 11 ? 0 : monthS + 1
                    const daysInMonth = 32 - new Date(yearF, monthF, 32).getDate()
                    dateF = daysInMonth >= profile.date ? profile.date : daysInMonth
                    await DB.createPeriod({name, dateS, monthS, yearS, dateF, monthF, yearF})
                    await DB.initIncomes('income_' + name)
                    await DB.initExpenses('expense_' + name)
                }
            }
        }

    } catch (e) {
        console.log('Error: ', e)
    }
}

