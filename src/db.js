import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('financeDB.db')

export class DB {

    static initCategories() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, sum REAL NOT NULL, icon TEXT NOT NULL, iconLibrary TEXT NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static addCategory(name, icon, iconLibrary) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO categories (name, sum, icon, iconLibrary) VALUES (?, 0, ?, ?)`,
                    [name, icon, iconLibrary],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeCategoryName(id, name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE categories SET name = ? WHERE id = ?',
                    [name, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeCategorySum(id, sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE categories SET sum = ? WHERE id = ?',
                    [sum, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getCategories() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM categories',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteCategory(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM categories WHERE id = ?`,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static initPeriods() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS periods (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, start REAL, end REAL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static addPeriod(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO periods (name) VALUES (?)`,
                    [name],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deletePeriod(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM periods WHERE id = ?`,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changePeriodStart(name, sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE periods SET start = ? WHERE name = ?',
                    [sum, name],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changePeriodEnd(name, sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE periods SET end = ? WHERE name = ?',
                    [sum, name],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getPeriods() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM periods',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static initWallet() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS wallet (id INTEGER PRIMARY KEY NOT NULL, sum REAL NOT NULL, saving REAL NOT NULL)',
                    [],
                    (result) => {
                        tx.executeSql(
                            'SELECT * FROM wallet WHERE ID=1',
                            [],
                            (_, result) => resolve(result.rows),
                            (_, error) => reject(error)
                        )
                    },
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createWallet() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO wallet (id, sum, saving) VALUES (1, 0, 0)`,
                    [],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeWalletSum(sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE wallet SET sum = ? WHERE id = 1',
                    [sum],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeWalletSaving(saving) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE wallet SET saving = ? WHERE id = 1',
                    [saving],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getWallet() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM wallet WHERE ID=1',
                    [],
                    (_, result) => resolve(result.rows._array[0]),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getWalletObject() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM wallet',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static initIncomes() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS incomes (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, sum REAL NOT NULL, date INTEGER NOT NULL, period TEXT NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getIncomes(period) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM incomes WHERE period = ?',
                    [period],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getAllIncomes() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM incomes',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static addIncome(name, sum, date, period) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO incomes (name, sum, date, period) VALUES (?, ?, ?, ?)`,
                    [name, sum, date, period],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeIncomeName(id, name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE incomes SET name = ? WHERE id = ?',
                    [name, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeIncomeSum(id, sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE incomes SET sum = ? WHERE id = ?',
                    [sum, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteIncome(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM incomes WHERE id = ?`,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static initExpenses() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, sum REAL NOT NULL, date INTEGER NOT NULL, period TEXT NOT NULL, category TEXT NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getExpenses(period) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM expenses WHERE period = ?',
                    [period],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getAllExpenses() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM expenses',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static addExpense(name, sum, date, period, category) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO expenses (name, sum, date, period, category) VALUES (?, ?, ?, ?, ?)`,
                    [name, sum, date, period, category],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeExpenseName(id, name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE expenses SET name = ? WHERE id = ?',
                    [name, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeExpenseSum(id, sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE expenses SET sum = ? WHERE id = ?',
                    [sum, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeExpenseCategory(id, category) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE expenses SET category = ? WHERE id = ?',
                    [category, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteExpense(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM expenses WHERE id = ?`,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static initPlan() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS plan (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, sum REAL NOT NULL, date INTEGER NOT NULL, category TEXT NOT NULL, deadline INTEGER NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getPlans() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM plan',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static addPlan(name, sum, date, category, deadline) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO plan (name, sum, date, category, deadline) VALUES (?, ?, ?, ?, ?)`,
                    [name, sum, date, category, deadline],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changePlanName(id, name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE plan SET name = ? WHERE id = ?',
                    [name, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changePlanSum(id, sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE plan SET sum = ? WHERE id = ?',
                    [sum, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changePlanCategory(id, category) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE plan SET category = ? WHERE id = ?',
                    [category, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changePlanDeadline(id, deadline) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE plan SET deadline = ? WHERE id = ?',
                    [deadline, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deletePlan(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM plan WHERE id = ?`,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static initCurrentPeriod(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${name} (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, plan REAL NOT NULL, fact REAL NOT NULL, icon TEXT NOT NULL, iconLibrary TEXT NOT NULL)`,
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static addCurrentCategory(table, name, plan, fact, icon, iconLibrary) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${table} (name, plan, fact, icon, iconLibrary) VALUES (?, ?, ?, ?, ?)`,
                    [name, plan, fact, icon, iconLibrary],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getCurrentPeriod(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${name}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getReportPeriod(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${name}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getReportExpenses(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${name}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteCurrentCategory(table, id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM ${table} WHERE id = ?`,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeCurrentCategoryName(table, id, name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${table} SET name = ? WHERE id = ?`,
                    [name, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeCurrentCategoryPlan(table, id, plan) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${table} SET plan = ? WHERE id = ?`,
                    [plan, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeCurrentCategoryFact(table, id, fact) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${table} SET fact = ? WHERE id = ?`,
                    [fact, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static dropTable(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DROP TABLE ${name}`,
                    [],
                    (_, result) => resolve(result.rows._array[0]),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static initSettings() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, theme TEXT NOT NULL, language TEXT NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }



    static createSettings(language) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO settings (id, theme, language) VALUES (1, 'light', ?)`,
                    [language],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getSettings() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM settings WHERE ID=1',
                    [],
                    (_, result) => resolve(result.rows._array[0]),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeLanguage(language) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE settings SET language = ? WHERE id = 1',
                    [language],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static changeTheme(theme) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE settings SET theme = ? WHERE id = 1',
                    [theme],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updateTable(table, column, properties) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `ALTER TABLE ${table} ADD ${column} ${properties}`,
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }


    static updateTablePeriods() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'ALTER TABLE periods ADD start REAL end REAL',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteFromPeriod(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM periods WHERE id=? `,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteByPeriodName(table, name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM ${table} WHERE period=? `,
                    [name],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }








}
