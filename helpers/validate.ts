function validateRequire (val) {
  return {result: !!val, message: 'Обязательно для заполнения'}
}

function validateLogin (login) {
  if (!validateWithoutSpecialSymbol(login).result) {
    return validateWithoutSpecialSymbol(login)
  }
  return {result: /^([a-zа-яA-ZА-Я0-9_-]){3,20}$/.test(login), message: 'Длина должна быть от ' + 3 + ' до ' + 20 }
}

function validateEmail (email) {
  return {result: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email), message: 'Введите корректный email'}
};

function validatePhone (phone) {
  return {result: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/.test(phone), message: 'Введите номер телефона в формате +7(***)***-**-**' }
}

function validateName (name) {
  if (!validateWithoutSpecialSymbol(name).result) {
    return validateWithoutSpecialSymbol(name)
  }
  return {result: /^[A-ZА-Я][a-zа-я]{0,100}$/.test(name), message: 'Первая буква должна быть заглавной, без пробелов и без цифр'}
}

function validateWithoutSpecialSymbol (string) {
  return {result: !new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g).test(string), message: 'Не должно быть спецсимволов' }
}

function validateLength (string) {
  if (!validateOnceLetterCapitalize(string).result) {
    return validateOnceLetterCapitalize(string)
  }

  return {result: /^([a-zа-яA-ZА-Я0-9_-]){8,20}$/.test(string), message: 'Длина должна быть от ' + 8 + ' до ' + 20 }
}

function validateOnceLetterCapitalize (string) {
  return {result: new RegExp('(?:^|[^A-ZА-Я])[A-ZА-Я]', 'g').test(string), message: 'Хотя бы одна буква должна быть заглавной'}
}

export { validateEmail, validateName, validateWithoutSpecialSymbol, validateLength, validateOnceLetterCapitalize, validatePhone, validateRequire, validateLogin }
