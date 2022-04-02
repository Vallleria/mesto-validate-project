(function() {

    const profileEditBtn = document.querySelector('.profile__edit-btn');

    profileEditBtn.addEventListener('click', function () {
        ModalModule.fillProfilePopupForm();
        ModalModule.togglePopup(ModalModule.profilePopup);
    });

   
    CardsModule.addCardsToPage();

})();