const conditionPassword = (password) => {
  const numOfCharac = 6;
  const lengthPassword = password.length;
  if (lengthPassword >= numOfCharac) {
    return true;
  }
  return false;
};

const conditionEmail = (email) => {
  const list = email.split('');
  const l = list.length - 1;
  const numOfCharac = 3;
  const phraseFinal = list[l - numOfCharac] + list[l - 2] + list[l - 1] + list[l];
  const temHaroba = list.some((item) => item === '@');
  if (temHaroba && phraseFinal === '.com') {
    return true;
  }
  return false;
};

const disabledButton = (email, password) => {
  if (conditionPassword(password) && conditionEmail(email)) {
    return false;
  }
  return true;
};

export default disabledButton;
