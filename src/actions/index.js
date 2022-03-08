// Coloque aqui suas actions
export const NEW_USER = 'NEW_USER';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';
export const DATA_WALLET_EXPENSES = 'DATA_WALLET_EXPENSES';
export const DATA_DELETE = 'DATA_DELETE';

export const actionWalletData = (obj) => ({
  type: DATA_WALLET_EXPENSES,
  obj,
});

export const actionDelete = (itemID) => ({
  type: DATA_DELETE,
  itemID,
});

export const actionNewUser = (email, password) => ({
  type: NEW_USER,
  email,
  password,
});

const actionAPIsucces = (objAPI) => ({
  type: API_SUCCESS,
  objAPI,
});

const actionAPIerror = (error) => ({
  type: API_ERROR,
  error,
});

/* export const fetchAPI = () => async (dispatch) => {
  dispatch(actionAPIrequest);
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(actionAPIsucces(json)))
    .catch((error) => dispatch(actionAPIerror(error)));
}; */

export const fetchAPI = () => async (dispatch) => {
  try {
    const fetchresp = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await fetchresp.json();
    delete json.USDT;
    dispatch(actionAPIsucces(json));
  } catch (error) {
    dispatch(actionAPIerror(error));
  }
};
