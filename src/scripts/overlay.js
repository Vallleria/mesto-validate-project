import { closePopup } from './modal'

const popups = document.querySelectorAll('.popup');

popups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains("popup")) {
            closePopup(popup)
        }
    })
});




