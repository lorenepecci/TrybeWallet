// Esse reducer será responsável por tratar as informações da pessoa usuária
import { NEW_USER } from '../actions';

const initialStateUser = {
  email: '',
  password: '',
};

const user = (state = initialStateUser, action) => {
  switch (action.type) {
  case NEW_USER:
    return {
      ...state,
      email: action.email,
      password: action.password,
    };
  default:
    return { ...state };
  }
};

export default user;
