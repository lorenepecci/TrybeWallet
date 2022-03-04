// Esse reducer será responsável por tratar as informações da pessoa usuária
import { NEW_USER } from '../actions';

const initialState = {
  user: {
    email: '',
    password: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case NEW_USER:
    return {
      ...state,
      user: {
        email: action.email,
        password: action.password,
      },
    };
  default:
    return { ...state };
  }
};

export default user;
