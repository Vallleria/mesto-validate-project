import { fillProfilePopupForm, openPopup, profilePopup } from './modal.js'
import { checkPopupEmptyInputs, validationConfig, enableValidation } from './validation.js'
import { getAppInfo } from './api.js'
import { updatePageProfile } from './profile.js'
import { addCardsToPage } from './card.js'


enableValidation(validationConfig);


getAppInfo()
    .then(([ profileInfo, cards ]) => {
        updatePageProfile(profileInfo)
        addCardsToPage(cards, profileInfo._id);
    })
    .catch(err => console.log(`Ошибка загрузки данных: ${err}`)) 

const profileEditBtn = document.querySelector('.profile__edit-btn');

profileEditBtn.addEventListener('click', function () {
    fillProfilePopupForm();
    openPopup(profilePopup);
    checkPopupEmptyInputs(profilePopup, validationConfig);
});

