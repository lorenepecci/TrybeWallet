// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  API_ERROR, API_SUCCESS,
  DATA_DELETE, DATA_WALLET_EXPENSES, EDIT_DATA,
} from '../actions';

const initialStateWallet = {
  objAPI: {},
  currencies: [],
  expenses: [],
  error: '',
};

const wallet = (state = initialStateWallet, action) => {
  switch (action.type) {
  case API_SUCCESS:
    return {
      ...state,
      objAPI: action.objAPI,
      currencies: Object.keys(action.objAPI),
    };
  case DATA_DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.itemID),
    };
  case EDIT_DATA:
    return {
      ...state,
      expenses: state.expenses.reduce((acc, expense) => {
        if (expense.id === action.id) {
          return [...acc, action.objEdit];
        }
        return [...acc, expense];
      }, []),
    };
  case DATA_WALLET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: (state.expenses.length),
        ...action.obj,
        exchangeRates: state.objAPI,
      }],
    };
  case API_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
