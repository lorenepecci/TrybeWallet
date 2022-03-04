// Coloque aqui suas actions
export const NEW_USER = 'NEW_USER';

export const actionNewUser = (email, password) => ({
  type: NEW_USER,
  email,
  password,
});
