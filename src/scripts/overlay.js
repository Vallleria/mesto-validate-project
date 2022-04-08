import { openPopup } from './modal'
import { checkPopupEmptyInputs } from './validation.js'

const popups = document.querySelectorAll('.popup');

popups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains("popup")) {
            openPopup(popup)
            checkPopupEmptyInputs(popup);
        }
    })
});




