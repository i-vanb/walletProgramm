import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('financeDB.db')

export class DB {

    static initProfile() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, sum INTEGER NOT NULL, adults INTEGER NOT NULL, children INTEGER NOT NULL, date INTEGER NOT NULL, month INTEGER NOT NULL, year INTEGER NOT NULL, indexMonth INTEGER NOT NULL, currentPeriod TEXT, startPeriod INTEGER, endPeriod INTEGER, daysLeft INTEGER)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteProfile() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DROP TABLE profile',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createProfile({name, sum, adults, children, date, month, year, indexMonth}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO profile (id, name, sum, adults, children, date, month, year, indexMonth) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [name, sum, adults, children, date, month, year, indexMonth],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updateProfile({name, sum, adults, children, date, month, year, indexMonth}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE profile SET name=?, sum=?, adults=?, children=?, date=?, month=?, year=?, indexMonth=? WHERE id = 1',
                    [name, sum, adults, children, date, month, year, indexMonth],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getProfile() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM profile WHERE ID = 1',
                    [],
                    (_, result) => resolve(result.rows._array[0]),
                    (_, error) => reject(error)
                )
            })
        })
    }

    // static setProfileCurrentPeriod(name, start, end) {
    //     return new Promise((resolve, reject) => {
    //         db.transaction(tx => {
    //             tx.executeSql(
    //                 `UPDATE profile SET currentPeriod=?, startPeriod=?, endPeriod=? WHERE id = 1`,
    //                 [name, start, end],
    //                 resolve,
    //                 (_, error) => reject(error)
    //             )
    //         })
    //     })
    // }


    // periods

    static initPeriods() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS periods (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, dateS INTEGER NOT NULL, monthS INTEGER NOT NULL, yearS INTEGER NOT NULL, dateF INTEGER NOT NULL, monthF INTEGER NOT NULL, yearF INTEGER NOT NULL, done INTEGER NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deletePeriods() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DROP TABLE periods',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createPeriod({name, dateS, monthS, yearS, dateF, monthF, yearF}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO periods (name, dateS, monthS, yearS, dateF, monthF, yearF, done) VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
                    [name, dateS, monthS, yearS, dateF, monthF, yearF],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static finishPeriod(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE periods SET done=1 WHERE id = ?`,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static unFinishPeriod(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE periods SET done=0 WHERE id = ?`,
                    [id],
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
                    `SELECT * FROM periods`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    // static getPeriod({id}) {
    //     return new Promise((resolve, reject) => {
    //         db.transaction(tx => {
    //             tx.executeSql(
    //                 `SELECT * FROM periods WHERE id = ?`,
    //                 [id],
    //                 (_, result) => resolve(result.rows._array),
    //                 (_, error) => reject(error)
    //             )
    //         })
    //     })
    // }

    static getLastPeriod() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM periods WHERE  ID=(SELECT MAX(ID) FROM periods)',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    // static removePeriod(name) {
    //     return new Promise((resolve, reject) => {
    //         db.transaction(tx => {
    //             tx.executeSql(
    //                 `DELETE FROM periods WHERE name = ?`,
    //                 [name],
    //                 resolve,
    //                 (_, error) => reject(error)
    //             )
    //         })
    //     })
    // }
    //
    // static removeALLPeriods() {
    //     return new Promise((resolve, reject) => {
    //         db.transaction(tx => {
    //             tx.executeSql(
    //                 `DELETE FROM periods`,
    //                 [],
    //                 () => console.log('PERIODS DELETED'),
    //                 (_, error) => reject(error)
    //             )
    //         })
    //     })
    // }


    // expenses

    static initExpenses(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${name} (id INTEGER PRIMARY KEY NOT NULL, category TEXT NOT NULL, name TEXT NOT NULL, sum REAL NOT NULL, paid INT NOT NULL, planSum REAL, deadLine INTEGER)`,
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static deleteTable(name) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DROP TABLE ${name}`,
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createExpense(table, category, name, sum) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${table} (category, name, sum, paid) VALUES (?, ?, ?, 1)`,
                    [category, name, sum],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static planExpense({tableName, category, name, planSum, deadLine}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${tableName} (category, name, sum, paid, planSum, deadLine) VALUES (?, ?, 0, 0, ?, ?)`,
                    [category, name, planSum, deadLine],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static payExpense({tableName, id, sum}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${tableName} SET sum=? paid=1 WHERE id = ?`,
                    [sum, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getExpense(tableName) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${tableName}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error, tableName)
                )
            })
        })
    }

    // incomes

    static initIncomes(tableName) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, sum REAL NOT NULL, date INTEGER NOT NULL)`,
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createIncome({table, name, sum, date}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${table} (name, sum, date) VALUES (?, ?, ?)`,
                    [name, sum, date],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getIncomes(tableName) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${tableName}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }


}
