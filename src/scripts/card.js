import { showImagePopup, showImagePopupImg, togglePopup } from './modal.js'

// Cards
const placesCards = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('.card-template');

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

// в этот объект добавляем функции или переменные,
// которые будут доступны в других частях программы
export {
    addCardsToPage,
    createCard
}

// })();







