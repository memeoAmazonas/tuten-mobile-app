export const formatPhoneNumber = (numberPhone) => {
  const number = numberPhone.split('-');
  number[0] = number[0].replace('+', '');
  let result = '';
  number.forEach(item => (result += (item)));
  return result.toString();
};

