import { addCardsToPage } from './card.js'
import { fillProfilePopupForm, togglePopup, profilePopup } from './modal.js'

const profileEditBtn = document.querySelector('.profile__edit-btn');

profileEditBtn.addEventListener('click', function () {
    fillProfilePopupForm();
    togglePopup(profilePopup);
});


addCardsToPage();

