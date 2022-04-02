const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];


const profileEditBtn = document.querySelector('.profile__edit-btn');

// Profile popup
const profilePopup = document.querySelector('.profile-popup');
const profilePopupCloseBtn = profilePopup.querySelector('.profile-popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formInputName = profilePopup.querySelector('.form__input[name="name"]');
const formInputProfession = profilePopup.querySelector('.form__input[name="profession"]');
const profilePopupForm = profilePopup.querySelector('.profile-popup__form');
const profileAddBtn = document.querySelector('.profile__add-btn');

// Cards
const placesCards = document.querySelector('.places__cards');

// Image popup
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close');
const formInputImage = imagePopup.querySelector('.form__input[name="image"]');
const formInputTitle = imagePopup.querySelector('.form__input[name="title"]');
const imagePopupForm = imagePopup.querySelector('.image-popup__form');
const showImagePopup = document.querySelector('.show-image-popup');
const showImagePopupCloseBtn = document.querySelector('.show-image-popup__close');

const showImagePopupImg = showImagePopup.querySelector('.show-image-popup__img');
const cardTemplate = document.querySelector('.card-template');


function fillProfilePopupForm() {
    formInputName.value = profileTitle.textContent;
    formInputProfession.value = profileSubtitle.textContent;
}

function updateProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = formInputName.value;
    profileSubtitle.textContent = formInputProfession.value;
    togglePopup(profilePopup);
}


function addCardsToPage() {
    initialCards.forEach(item => createCard(item.link, item.name))
}

function getCard(link, name) {
    // создаем копию карточки из шаблона
    const card = cardTemplate.content.querySelector('.card').cloneNode(true);
    // заполняем карточку
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__like').addEventListener('click', function (event) {
        event.target.classList.toggle('card__like_active');
    });
    card.querySelector('.card__trash').addEventListener('click', function () {
        card.remove();
    });

    // добавить обработчик по клику на картинку в card
    cardImage.addEventListener('click', function () {
        // вставить в image-popup ссылку и название
        showImagePopupImg.src = link;
        showImagePopupImg.alt = name;

        showImagePopup.querySelector('.show-image-popup__title').textContent = name;
        // показать show-image-popup
        togglePopup(showImagePopup);
    })
    return card;
}
// Добавить карточку в список карточек в html
function createCard(link, name) {
    const card = getCard(link, name);   // создаем и заполняем карточку
    placesCards.prepend(card);           // вставляем в список карточек в документ

}


function togglePopup(popup) {
    popup.classList.toggle("popup_opened");
}

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
    togglePopup(imagePopup);

}


profileEditBtn.addEventListener('click', function () {
    fillProfilePopupForm();
    togglePopup(profilePopup);
});
profilePopupCloseBtn.addEventListener('click', function () {
    togglePopup(profilePopup)
});
profilePopupForm.addEventListener('submit', updateProfile);
profileAddBtn.addEventListener('click', function () {
    togglePopup(imagePopup)
});
imagePopupCloseBtn.addEventListener('click', function () {
    togglePopup(imagePopup)
});
imagePopupForm.addEventListener('submit', addImage)
showImagePopupCloseBtn.addEventListener('click', function () {
    togglePopup(showImagePopup)
});

addCardsToPage();


