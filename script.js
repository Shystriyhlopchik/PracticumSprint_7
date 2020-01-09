//Отлично: Используются комментарии в коде.
/*-------------------------Переменные------------------------------*/
const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const popup = document.querySelector('.popup');
const popups = root.querySelectorAll('.popup');
const userInfo = root.querySelector('.user-info');
const form = document.forms.new;
const formEdit = document.forms.form_edit;
//Можно лучше: Не лучший подход. По цифрам сложно понять, что это за попап. Стоит придумать каждому попапу свой дополнителыный класс и искать по нему. Наждому попапу своя переменная.
const first=0;
const second=1;
const third=2;
/*-------------------------Переменные------------------------------*/

/*_________________________________________________________________*/
/*---------------------------Функции-------------------------------*/

/*------------------Десять карточек из коробки---------------------*/
//Можно лучше: Функция дублирует creatCard. Стоит оставить одну из них.
//Можно лучше: Стоит обернуть цикл в функцию, принимающую на вход массив. Так у нас будет универсальная функция, которую мы сможем вызвать в нужный момент и на разных данных. Локальных или серверных.
function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        placesList.innerHTML += `
      <div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>`
        /*---------Добавление названия------------*/
        let lastCard = placesList.lastElementChild;
        let placeCardName = lastCard.querySelector('.place-card__name');
        placeCardName.textContent = initialCards[i].name;
        /*---------Добавление изображения---------*/
        let placeCardImage = lastCard.querySelector('.place-card__image');
        placeCardImage.setAttribute('style', `background-image: url(${initialCards[i].link})`);
    }
}

/*---------------Десять карточек из коробки-------------------------*/

/*--------------------Открытие/закрытие формы-----------------------*/
function statusForm(event) {
    if (event.target.classList.contains('user-info__button'))
      popups[first].classList.toggle('popup_is-opened');
    else if (event.target.classList.contains('user-info__edit')){
      const button = popups[second].querySelector('.button');
      button.setAttribute('disabled', true);
      button.classList.remove('button__disabled');
      searchInformation();
      popups[second].classList.toggle('popup_is-opened');
    }
    else if (event.target.classList.contains('popup__close')){
      event.target.closest('.popup').classList.toggle('popup_is-opened');
      resetErrors(event);
    }
}
/*--------------------Открытие/закрытие формы-----------------------*/

/*-------------------Очистка сообщений об ошибке--------------------*/
function resetErrors (event) {
  const parent = event.target.parentElement;
  const inputs = parent.querySelectorAll('.popup__error-message');
  inputs.forEach(element => {
    element.textContent = '';
  });
}
/*-------------------Очистка сообщений об ошибке--------------------*/

/*---------------------Обработка лайков и удаления-------------------*/
function handler(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
        //Можно лучше: Стоит разделить логику. В этой функции оставить проверки, а вложенный в условия код вынести в функции с говорящими названиями.Так у нас будут небольшие, легко анализируемы функции. А говорящие названия помогут в анализе кода.
        event.target.classList.toggle('place-card__like-icon_liked');
    } else if (event.target.classList.contains('place-card__delete-icon')) {
        placesList.removeChild(event.target.closest('.place-card'));
    }
    else if (event.target.classList.contains('place-card__image')){
      editPopupImage(event);
      popups[third].classList.toggle('popup_is-opened');
    }
}
/*---------------------Обработка лайков и удаления-------------------*/

/*-------------------Функция для создания карточки-------------------*/
function creatCard(name, link) {
    const placeCardContainer = document.createElement('div');
    const placeCardImageContainer = document.createElement('div');
    const placeCardDeleteIconButton = document.createElement('button');
    const placeCardDescriptionContainer = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLikeIconButton = document.createElement('button');

    placeCardContainer.classList.add('place-card');
    placeCardImageContainer.classList.add('place-card__image');
    placeCardImageContainer.setAttribute('style', `background-image: url(${link})`);
    placeCardDeleteIconButton.classList.add('place-card__delete-icon');
    placeCardDescriptionContainer.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = name;
    placeCardLikeIconButton.classList.add('place-card__like-icon');

    placeCardImageContainer.appendChild(placeCardDeleteIconButton);
    placeCardDescriptionContainer.appendChild(placeCardName);
    placeCardDescriptionContainer.appendChild(placeCardLikeIconButton);
    placeCardContainer.appendChild(placeCardImageContainer);
    placeCardContainer.appendChild(placeCardDescriptionContainer);
    return placeCardContainer;
}
/*-------------------Функция для создания карточки-------------------*/

/*----------------Функция для для добавления карточки----------------*/
function addCard(event) {
  event.preventDefault();
  const name = form.elements.name;
  const link = form.elements.link;
  const cardContainer = creatCard(name.value, link.value);
  placesList.appendChild(cardContainer);
  form.reset();
  popup.classList.toggle('popup_is-opened');
}
/*----------------Функция для для добавления карточки----------------*/

/*----------------------Поиск информации о себе----------------------*/
function searchInformation(){
  popups[second].querySelector('.popup__input_type_name').value = userInfo.querySelector('.user-info__name').textContent;
  popups[second].querySelector('.popup__input_type_link-url').value = userInfo.querySelector('.user-info__job').textContent;
}
/*----------------------Поиск информации о себе----------------------*/
/*--------------Редактирование информации о себе---------------------*/
function editInformation(event){
  event.preventDefault();
  const name = formEdit.elements.name;
  const link = formEdit.elements.link;
  textUserName = name.value;
  userInformation = link.value;
  userInfo.querySelector('.user-info__name').textContent = name.value;
  userInfo.querySelector('.user-info__job').textContent = link.value;
  popups[second].classList.toggle('popup_is-opened');
}
/*--------------Редактирование информации о себе---------------------*/
/*-------------------Редактирование попапа---------------------------*/
function editPopupImage(event){
  const attribute = event.target.getAttribute("style");
  popups[third].querySelector('.popup__image').setAttribute('style', attribute);
}
/*-------------------Редактирование попапа---------------------------*/

/*---------------------------Функции---------------------------------*/
/*___________________________________________________________________*/
/*_________________________________________________________________*/
/*---------------------------Слушатели-----------------------------*/
form.addEventListener('submit', addCard);
placesList.addEventListener('click', handler);
root.addEventListener('click', statusForm);
popups[second].addEventListener('submit', editInformation);

/*---------------------------Слушатели-----------------------------*/
/*_________________________________________________________________*/

/*_________________________________________________________________*/
/*-----------------------Вызываемые функции------------------------*/
addCards();
/*-----------------------Вызываемые функции------------------------*/
/*_________________________________________________________________*/

/*Отлично. Весь фнкционал работает корректно.
* Будет супер, если "Можно лучше" не останутся без внимания. Это повысит общий уровень кода.
* Комментарии в коде лучше оставлять только сверху. Иначе их становится слишком много и непонятно к какой части они относятся.
* Удачи в дальнейшем обучении.*/
