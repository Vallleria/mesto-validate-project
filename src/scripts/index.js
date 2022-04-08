import { addCardsToPage } from './card.js'
import { fillProfilePopupForm, openPopup, profilePopup } from './modal.js'
import { checkPopupEmptyInputs } from './validation.js'

const profileEditBtn = document.querySelector('.profile__edit-btn');

profileEditBtn.addEventListener('click', function () {
    fillProfilePopupForm();
    openPopup(profilePopup);
    checkPopupEmptyInputs(profilePopup);
});


addCardsToPage();

