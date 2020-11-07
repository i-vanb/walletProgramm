import * as Font from 'expo-font'
import {DB} from "./db"
import {testData} from "./utilities/testData";
import {getDateInMs, getTodayInMS} from "./utilities/getTodayInMS"
import {getMonthName} from "./utilities/getMonthName"
import {THEME} from "./theme"
import {NativeModules, Platform} from "react-native"




export async function bootstrap() {
    const periodsObj = [
        {id: 1, name: 'january_2020', start: 0, end: 8000},
        {id: 2, name: 'february_2020', start: 8000, end: 7000},
        {id: 3, name: 'march_2020', start: 7000, end: 3000},
        {id: 4, name: 'april_2020', start: 3000, end: 5000},
        {id: 5, name: 'may_2020', start: 5000, end: 9000},
        {id: 6, name: 'june_2020', start: 9000, end: 12000},
        {id: 7, name: 'july_2020', start: 12000, end: 4000},
        {id: 8, name: 'august_2020', start: 4000, end: null}, // 10 000
    ]

    const exp = [
        {id: 1, fact: 10000}, {id: 2, fact: 8000}, {id: 3, fact: 7000}, {id: 4, fact: 0},
        {id: 5, fact: 23000}, {id: 6, fact: 0}, {id: 7, fact: 7000}, {id: 8, fact: 3000},
        {id: 9, fact: 0}, {id: 10, fact: 7000}, {id: 11, fact: 0}, {id: 12, fact: 9000},
        {id: 13, fact: 23000}, {id: 14, fact: 8000}, {id: 15, fact: 4000}
        // total 105

    ]

    const incomes = [
        // {name: 'salary', sum: 38000, date: getDateInMs(2020, 0, 9), period: 'january_2020'},
        // {name: 'prize', sum: 20000, date: getDateInMs(2020, 0, 18), period: 'january_2020'},
        // {name: 'salary', sum: 55000, date: getDateInMs(2020, 0, 25), period: 'january_2020'},
        //
        // {name: 'salary', sum: 43000, date: getDateInMs(2020, 1, 7), period: 'february_2020'},
        // {name: 'salary', sum: 58000, date: getDateInMs(2020, 1, 25), period: 'february_2020'},
        //
        // {name: 'salary', sum: 37000, date: getDateInMs(2020, 2, 10), period: 'march_2020'},
        // {name: 'salary', sum: 43000, date: getDateInMs(2020, 2, 23), period: 'march_2020'},
        //
        // {name: 'salary', sum: 61000, date: getDateInMs(2020, 3, 5), period: 'april_2020'},
        // {name: 'selling', sum: 29000, date: getDateInMs(2020, 3, 12), period: 'april_2020'},
        // {name: 'salary', sum: 55000, date: getDateInMs(2020, 3, 20), period: 'april_2020'},
        //
        // {name: 'salary', sum: 37000, date: getDateInMs(2020, 4, 10), period: 'may_2020'},
        // {name: 'salary', sum: 67000, date: getDateInMs(2020, 4, 25), period: 'may_2020'},
        //
        // {name: 'selling', sum: 30000, date: getDateInMs(2020, 5, 4), period: 'june_2020'},
        // {name: 'salary', sum: 38000, date: getDateInMs(2020, 5, 9), period: 'june_2020'},
        // {name: 'salary', sum: 58000, date: getDateInMs(2020, 5, 22), period: 'june_2020'},

        // {name: 'salary', sum: 28000, date: getDateInMs(2020, 6, 2), period: 'july_2020'},
        // {name: 'salary', sum: 56000, date: getDateInMs(2020, 6, 23), period: 'july_2020'},
        // {name: 'insurance', sum: 16000, date: getDateInMs(2020, 6, 29), period: 'july_2020'},

        // {name: 'salary', sum: 48000, date: getDateInMs(2020, 7, 9), period: 'august_2020'},
        // {name: 'salary', sum: 51000, date: getDateInMs(2020, 7, 23), period: 'august_2020'},
    ]

    try {
        await Font.loadAsync({
            'bitter-bold': require('../assets/fonts/Bitter-Bold.ttf'),
            'bitter-regular': require('../assets/fonts/Bitter-Regular.ttf'),
            'start-font': require('../assets/fonts/LuckiestGuy-Regular.ttf')
        })

        // exp.map(async e => await DB.changeCurrentCategoryFact('january_2020', e.id, e.fact))
        // exp.map(async e => await DB.changeCurrentCategoryPlan('january_2020', e.id, e.fact))
        // await DB.deleteByPeriodName('incomes', 'july_2020')
        // await DB.deleteByPeriodName('expenses', 'july_2020')
        // await DB.dropTable('july_2020')
        // await DB.dropTable('categories')
        // await DB.dropTable('wallet')
        // await DB.dropTable('incomes')
        // await DB.dropTable('expenses')
        // await DB.dropTable('plan')
        // await DB.dropTable('august_2020')
        // await DB.dropTable('settings')

        await DB.initPeriods()
        await DB.initCategories()
        await DB.initWallet()
        await DB.initIncomes()
        await DB.initExpenses()
        await DB.initPlan()
        await DB.initSettings()

        // await DB.addIncome(incomes[0].name, incomes[0].sum, incomes[0].date, incomes[0].period)
        // await DB.addIncome(incomes[1].name, incomes[1].sum, incomes[1].date, incomes[1].period)
        // await DB.addIncome(incomes[2].name, incomes[2].sum, incomes[2].date, incomes[2].period)
        // await DB.changePeriodStart('july_2020', 12000)
        // await DB.changePeriodEnd('july_2020', 4000)

        // await DB.createWallet()
        // await DB.changeWalletSum(10000)
        // await DB.createSettings('english')
        // THEME.categories.map(async c => await DB.addCategory(c.name, c.icon, c.iconLibrary))
        //
        // periodsObj.map(async p => {
        //     console.log('period is mapping')
        //     await DB.addPeriod(p.name)
        //     await DB.changePeriodStart(p.name, p.start)
        //     if(p.end > 0) {
        //         await DB.changePeriodEnd(p.name, p.end)
        //     }
        //     await DB.initCurrentPeriod(p.name)
        //     THEME.categories.map(async c => await DB.addCurrentCategory(p.name, c.name, 0, 0, c.icon, c.iconLibrary))
        // })

        // incomes.map(async i => await DB.addIncome(i.name, i.sum, i.date, i.period))

        const periods = await DB.getPeriods()

        if (!periods.length) {
            // create default categories
            THEME.categories.map(async c => await DB.addCategory(c.name, c.icon, c.iconLibrary))
            console.log(await DB.getCategories())

            // create first period
            const periodName = getMonthName(new Date(getTodayInMS()).getMonth()) + '_' + new Date(getTodayInMS()).getFullYear()
            console.log('name of period is', periodName)
            await DB.addPeriod(periodName)
            await DB.changePeriodStart(periodName, 0)
            console.log(await DB.getPeriods())

            // create wallet
            await DB.createWallet()
            console.log(await DB.getWalletObject())

            // create current period
            await DB.initCurrentPeriod(periodName)
            THEME.categories.map(async c => await DB.addCurrentCategory(periodName, c.name, 0, 0, c.icon, c.iconLibrary))
            console.log(await DB.getCurrentPeriod(periodName))

            const deviceLanguage =
                Platform.OS === 'ios'
                    ? NativeModules.SettingsManager.settings.AppleLocale ||
                    NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
                    : NativeModules.I18nManager.localeIdentifier;

            if (deviceLanguage === 'ru_RU') {
                await DB.createSettings('russian')
            } else {
                await DB.createSettings('english')
            }

        } else {
            const periodName = getMonthName(new Date(getTodayInMS()).getMonth()) + '_' + new Date(getTodayInMS()).getFullYear()
            if (periodName !== periods[periods.length-1].name) {
                const plans = await DB.getPlans()
                console.log('!!!!!!!!!!!!!! period is not the same - ',  periodName)
                const wallet = await DB.getWallet()

                // end previous period
                await DB.changePeriodEnd(periods[periods.length-1].name, wallet.sum)

                // create new period
                await DB.addPeriod(periodName)
                await DB.changePeriodStart(periodName, wallet.sum)

                // create current period
                await DB.initCurrentPeriod(periodName)
                const categories = await DB.getCategories()
                categories.map(async c => {
                    await DB.addCurrentCategory(periodName, c.name, 0, 0, c.icon, c.iconLibrary)
                })

                let currentPeriod = await DB.getCurrentPeriod(periodName)
                plans.map(async p => {
                    // const current = currentPeriod.find(c => p.category === c.name)
                    const currentIndex = currentPeriod.findIndex(c => p.category === c.name)
                    currentPeriod[currentIndex].plan += p.sum
                    await DB.changeCurrentCategoryPlan(periodName, currentPeriod[currentIndex].id, currentPeriod[currentIndex].plan)
                })

            }
        }

    } catch (e) {
        console.log('Error: ', e)
    }
}

