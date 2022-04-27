import { createCard } from './card.js'
import { resetPopupFormValidation, checkPopupEmptyInputs, validationConfig } from './validation.js'
import { patchProfileAvatar, patchProfileInfo, postNewCard } from './api.js'
import { updatePageProfile } from './profile.js'

// Profile popup
const profilePopup = document.querySelector('.profile-popup');
const profilePopupCloseBtn = profilePopup.querySelector('.profile-popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formInputName = profilePopup.querySelector('.form__input[name="name"]');
const formInputProfession = profilePopup.querySelector('.form__input[name="profession"]');
const profilePopupForm = profilePopup.querySelector('.profile-popup__form');
const profileAddBtn = document.querySelector('.profile__add-btn');

/* TODO:
0. При наведение курсором на аватрку показать иконку редактирования
1. Обработать клик по аватарке на странице и показать модальное окно avatarPopup
2. Проверка введенных данных в поле url
3. При клике на кнопку Сохранить выполнить проверку и отправить данные на сервер, закрыть модалку

*/

// AvatarPopup
const avatarImageWrapper = document.querySelector('.profile__image-wrapper');
const avatarPopup = document.querySelector('.avatar-popup');
const avatarPopupCloseBtn = avatarPopup.querySelector('.avatar-popup__close');
const avatarPopupForm = avatarPopup.querySelector('.avatar-popup__form');
const avatarInputUrl = avatarPopup.querySelector('.form__input[name="url"]');



// Image popup
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close');
const formInputImage = imagePopup.querySelector('.form__input[name="image"]');
const formInputTitle = imagePopup.querySelector('.form__input[name="title"]');
const imagePopupForm = imagePopup.querySelector('.image-popup__form');
const showImagePopup = document.querySelector('.show-image-popup');
const showImagePopupCloseBtn = document.querySelector('.show-image-popup__close');
const showImagePopupImg = showImagePopup.querySelector('.show-image-popup__img');


function fillProfilePopupForm() {
    formInputName.value = profileTitle.textContent;
    formInputProfession.value = profileSubtitle.textContent;
}

function updateSaveButtonState(form, text, isDisabled) {
    const saveButton = form.querySelector('.button_type_primary');
    saveButton.textContent = text;
    saveButton.setAttribute('disabled', isDisabled)
}

function startSaveButtonLoading(form) {
    updateSaveButtonState(form, 'Сохранить...', true);
}

function stopSaveButtonLoading(form) {
    updateSaveButtonState(form, 'Сохранить', false);
}

function updateProfile(evt) {
    evt.preventDefault();
    // поменять текст на кнопке Сохранение...
    // заблокировать кнопку, пока идет отпрвка
    //startSaveButtonLoading(...);
    const form = evt.target;  // profilePopupForm
    
    startSaveButtonLoading(form);
    patchProfileInfo(formInputName.value, formInputProfession.value)
    .then(function(profileData){
        resetPopupFormValidation(imagePopup, validationConfig);
        closePopup(profilePopup);
        updatePageProfile(profileData);
    })
    .catch(function(error){
       console.log(error);
    })
    .finally(() => {
        // не зависимо от then или catch вернуть обратно текст на кнопке Сохранить
        // и разблокировать ее
        stopSaveButtonLoading(form);
    }); 
    // отправить новые данные из полей ввода на сервер
    // если все ок, обновить на странице
    // profileTitle.textContent = formInputName.value;
    // profileSubtitle.textContent = formInputProfession.value;

   
}


function closeByEscape(evt) {
    if(evt.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if(openedPopup){
            closePopup(openedPopup);
        }
    } 
}

function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};


function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
};



function addImage(evt) {
    evt.preventDefault();
    const form = evt.target;
    startSaveButtonLoading(form);


    // берем из полей ввода имя и ссылку
    const link = formInputImage.value;
    const name = formInputTitle.value;

    // 1. получить ссылки и имя из формы
    // 2. отправить ссылку и имя на сервер
    // 3. если все хорошо, то 
    //    - очистить поля ввода
    //    - создать карточку с данными
    //    - сбросить валидация и закрыть окошко
    postNewCard(name, link)
    .then(function(card){
        formInputImage.value = '';
        formInputTitle.value = '';
        
        createCard(card, card.owner._id);
        resetPopupFormValidation(imagePopup, validationConfig);
        closePopup(imagePopup);
        startSaveButtonLoading(form);
    }) .catch(function(error){
        stopSaveButtonLoading(form)
         console.log(error)
    })
    



    // очистить поля ввода
    // 

    // создаем карточку с данными из полей
    // 
    // скрыть image-popup
    // 

}



profilePopupCloseBtn.addEventListener('click', function () {
    resetPopupFormValidation(profilePopup, validationConfig);
    closePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', updateProfile);

profileAddBtn.addEventListener('click', function (evt) {
    openPopup(imagePopup);
    checkPopupEmptyInputs(imagePopup, validationConfig);
});

imagePopupCloseBtn.addEventListener('click', function () {
    resetPopupFormValidation(imagePopup, validationConfig);
    closePopup(imagePopup)
});

imagePopupForm.addEventListener('submit', addImage)

showImagePopupCloseBtn.addEventListener('click', function () {
    closePopup(showImagePopup)
});

// ------- Обработка событий avatar popup ---------

// обработка отправки формы с url аватара
function updateAvatar(evt){
    evt.preventDefault();
    const form = evt.target; 
    startSaveButtonLoading(form);
    // отправить данные и если все ок, то очистка и закрываем окно
    patchProfileAvatar(avatarInputUrl.value)
    .then(function(profileData){
        resetPopupFormValidation(avatarPopup, validationConfig);
        closePopup(avatarPopup);
        updatePageProfile (profileData)
        stopSaveButtonLoading(form);
    })
    .catch(function(error){
       stopSaveButtonLoading(form);
       console.log(error)
    })
};

avatarPopupForm.addEventListener('submit', updateAvatar);

avatarPopupCloseBtn.addEventListener('click', function () {
    resetPopupFormValidation(avatarPopup, validationConfig);
    closePopup(avatarPopup)
});

avatarImageWrapper.addEventListener('click', function (evt) {
    openPopup(avatarPopup);
    checkPopupEmptyInputs(avatarPopup, validationConfig);
});


export {
    profilePopupCloseBtn,
    profilePopupForm,
    profileAddBtn,
    profilePopup,
    imagePopupCloseBtn,
    imagePopupForm,
    showImagePopupCloseBtn,
    imagePopup,
    showImagePopup,
    showImagePopupImg,
    fillProfilePopupForm,
    addImage,
    updateProfile,
    openPopup,
    closePopup,
}


