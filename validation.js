const information = document.querySelector('#information');
const username = document.querySelector('#username');
let textUserName = userInfo.querySelector('.user-info__name').textContent;
let userInformation = userInfo.querySelector('.user-info__job').textContent;

//Функции
/*------------------------Валидация форм-----------------------------*/
function inputHandler(event) {
  const name = event.currentTarget.elements.name;
  const link = event.currentTarget.elements.link;
  const button = event.currentTarget.querySelector('.button');
  
  if ((name.value.length < 2) || (link.value.length < 2) || equalityTest(name, link)) {
    button.setAttribute('disabled', true);
    button.classList.remove('button__disabled');
  }
  else {
    button.removeAttribute('disabled');
    button.classList.add('button__disabled');
  }
}
/*------------------------Валидация форм-----------------------------*/

/*--------Проверка переменных с textUserName и userInformation-------*/
function equalityTest(nameElement, linkElement) {
  if ((textUserName === nameElement.value) && (userInformation === linkElement.value)) {
    return true;
  }
  return false;
} 
/*--------Проверка переменных с textUserName и userInformation-------*/

function handleValidate(event) {
    event.preventDefault();
    validate(event.target);
}

function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (!element.checkValidity(element)) {
      errorElement.textContent = 'Это обязательное поле';
      return false;
    } else if (!inputLenght(element.value)){
        const errorMessage = 'Должно быть от 2 до 30 символов';
        errorElement.textContent = errorMessage;
        return false; 
    }
    resetError(element);
    return true;
  }

  function inputLenght(value){
    if ((value.length < 31) && (value.length > 1)) 
        return true;
    else return false;
  }
  
  function resetError (element) {
    const temp = document.querySelector(`#error-${element.id}`);
    temp.textContent = '';
  }

//слушатели
username.addEventListener('input', handleValidate);
information.addEventListener('input', handleValidate);
form.addEventListener('input', inputHandler);
formEdit.addEventListener('input', inputHandler);