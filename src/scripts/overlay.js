import {togglePopup} from './modal'

const popups = document.querySelectorAll('.popup');

// function closePopup(popup) {
//     /*
//     Если popup содержит класс popup
//     то закроем попап
//     */
    
//     if (evt.target.classList.contains("popup")) {
//         popup.classList.remove('popup_opened');
//     }

// }


document.addEventListener('keydown', function(event){
    if(event.code === 'Escape') {
        const popup = Array.from(popups).find(function(popup){
            return popup.classList.contains('popup_opened')
        });
        if(popup){
            togglePopup(popup);
        }
       
    }
});

popups.forEach(function(popup){
   popup.addEventListener('click', function(evt){
    if (evt.target.classList.contains("popup")){
        togglePopup(popup)
    }
   })
});




