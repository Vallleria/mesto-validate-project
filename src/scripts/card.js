import { showImagePopup, showImagePopupImg, openPopup } from './modal.js'
import { getAppInfo, deleteCard, putCardLike, deleteCardLike } from './api.js'

// Cards
const placesCards = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('.card-template');


// getAppInfo()
//     .then(([ profileInfo, cards ]) => {
//         addCardsToPage(cards, profileInfo._id);
//     })
//     .catch(err => console.log(`Ошибка загрузки данных: ${err}`)) 



// const initialCards = [{
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
// },
// {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
// },
// {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
// },
// {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
// },
// {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
// },
// {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
// }
// ];


function addCardsToPage(initialCards, profileId) {
    initialCards.forEach(card => createCard(card, profileId))
}

function getCard(cardInfo, profileId) {
    // создаем копию карточки из шаблона
    const card = cardTemplate.content.querySelector('.card').cloneNode(true);

    // заполняем карточку
    const cardImage = card.querySelector('.card__image');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardImage.id = cardInfo._id;

    // меняем текст карточки
    card.querySelector('.card__title').textContent = cardInfo.name;

    const cardLikeCounter = card.querySelector('.card__like-counter');
    const cardLike = card.querySelector('.card__like');

    const isMeLiked = cardInfo.likes.some(function(owner) {
        return owner._id === profileId;
    });

    if (isMeLiked) {
        cardLike.classList.add('card__like_active');
    }

    // обрабатываем клик по лайку
    cardLike.addEventListener('click', function (event) {
        const likeIcon = event.target;
        const isLiked = likeIcon.classList.contains("card__like_active");
      
        // Если мы есть в списке cardInfo.likes
        // отправить запрос на удаление лайка и убрать лайк и уменьшить счетчик
        // console.log(isLiked)
        if (isLiked) {
            deleteCardLike(cardInfo._id)
                .then(function () {
                    likeIcon.classList.toggle('card__like_active');
                    cardLikeCounter.textContent = parseInt(cardLikeCounter.textContent) - 1;
                }).catch(function (error) {
                    console.log(error)
                })

        } else {
            // Иначе устанавливаем лай
            putCardLike(cardInfo._id)
                .then(function () {
                    likeIcon.classList.toggle('card__like_active');
                    cardLikeCounter.textContent = parseInt(cardLikeCounter.textContent) + 1;
                }).catch(function (error) {
                    console.log(error)
                })

        }
    });
    cardLikeCounter.textContent = cardInfo.likes.length;

    // Если card принадлежит тебе, то добавляем обработчик события удаления
    // Иначе прячем корзину
    const trashIcon = card.querySelector('.card__trash');
    if (cardInfo.owner._id === profileId) {
        trashIcon.addEventListener('click', function () {
            deleteCard(cardInfo._id)
                .then(function () {
                    card.remove()
                })
                .catch(function (error) {
                    console.log(error)
                })
        });
    } else {
        trashIcon.remove();
    }

    // добавить обработчик по клику на картинку в card
    cardImage.addEventListener('click', function () {
        // вставить в image-popup ссылку и название
        showImagePopupImg.src = cardInfo.link;
        showImagePopupImg.alt = cardInfo.name;

        showImagePopup.querySelector('.show-image-popup__title').textContent = cardInfo.name;
        // показать show-image-popup
        openPopup(showImagePopup);
    })
    return card;
}
// Добавить карточку в список карточек в html
function createCard(card, profileId) {
    const cardElement = getCard(card, profileId);   // создаем и заполняем карточку
    placesCards.prepend(cardElement);           // вставляем в список карточек в документ

}

// в этот объект добавляем функции или переменные,
// которые будут доступны в других частях программы
export {
    createCard,
    addCardsToPage

}

// })();







