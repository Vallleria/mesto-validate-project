(function(){
    const popup = document.querySelector('.popup');
    
    
    function closePopup(evt){
        /*
        Если evt.target содержит класс popup
        то закроем попап
        */

       if(evt.target.classList.contains("popup")) {
        evt.target.classList.remove('popup_opened'); 
       }
        
    }

    popup.addEventListener('click',  closePopup);
})();


