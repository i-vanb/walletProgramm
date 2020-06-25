import {
    CREATE_EXPENSE,
    CREATE_INCOME,
    CREATE_PERIOD,
    END_PERIOD, LOAD_CURRENT_DATA,
    LOAD_EXPENSES,
    LOAD_INCOMES,
    LOAD_PERIODS, MAKE_EXPENSE, MAKE_INCOME
} from "../types"

const initialState = {
    periods: [], expenses: {}, incomes: {}
}

export const periodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PERIOD:
            return {
                ...state,
                periods: action.payload
            }

        case CREATE_INCOME:
            return {
                ...state, incomes: {
                     ...state.incomes, [action.payload]: []
                }
            }

        case CREATE_EXPENSE:
            return {
                ...state,
                expenses: {
                    ...state.expenses, [action.payload]: []
                }
            }

        case LOAD_PERIODS:
            return {
                ...state,
                periods: action.payload
            }

        case LOAD_EXPENSES:
            return {
                ...state,
                expenses: {
                    ...state.expenses, ...action.payload
                }
            }

        case LOAD_CURRENT_DATA:
            // console.log('******************action',action.payload.period)
            return {
                ...state,
                periods: action.payload.period,
                incomes: {
                    ...state.incomes, ...action.payload.incomes
                },
                expenses: {
                    ...state.expenses, ...action.payload.expenses
                }
            }

        case LOAD_INCOMES:
            return {
                ...state,
                incomes: {
                    ...state.incomes, ...action.payload
                }
            }

        case END_PERIOD:
            state.periods.map(period => period.id === action.payload ? period.done = 1 : null)
            return state

        case MAKE_EXPENSE:
            return state

        case MAKE_INCOME:
            return state


        default:
            return state
    }
}
