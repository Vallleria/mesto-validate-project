import { createCard } from './card.js'
import { resetPopupFormValidation, checkPopupEmptyInputs } from './validation.js'

// Profile popup
const profilePopup = document.querySelector('.profile-popup');
const profilePopupCloseBtn = profilePopup.querySelector('.profile-popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formInputName = profilePopup.querySelector('.form__input[name="name"]');
const formInputProfession = profilePopup.querySelector('.form__input[name="profession"]');
const profilePopupForm = profilePopup.querySelector('.profile-popup__form');
const profileAddBtn = document.querySelector('.profile__add-btn');


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

function updateProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = formInputName.value;
    profileSubtitle.textContent = formInputProfession.value;
    resetPopupFormValidation(imagePopup);
    closePopup(profilePopup);
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

    // берем из полей ввода имя и ссылку
    const link = formInputImage.value;
    const name = formInputTitle.value;

    // очистить поля ввода
    formInputImage.value = '';
    formInputTitle.value = '';

    // создаем карточку с данными из полей
    createCard(link, name);
    // скрыть image-popup
    resetPopupFormValidation(imagePopup);
    closePopup(imagePopup);

}

profilePopupCloseBtn.addEventListener('click', function () {
    resetPopupFormValidation(profilePopup);
    closePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', updateProfile);

profileAddBtn.addEventListener('click', function (evt) {
    openPopup(imagePopup);
    checkPopupEmptyInputs(imagePopup);
});

imagePopupCloseBtn.addEventListener('click', function () {
    resetPopupFormValidation(imagePopup);
    closePopup(imagePopup)
});
imagePopupForm.addEventListener('submit', addImage)

showImagePopupCloseBtn.addEventListener('click', function () {
    closePopup(showImagePopup)
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


