const formPopupProfile  = document.querySelector('.profile-popup__form');
const formInputPopupProfile = formPopupProfile.querySelector('.form__input');
const formPopupError = formPopupProfile.querySelector(`.${formInputPopupProfile.id}-error`)
const formPopupProfileButton = formPopupProfile.querySelector('.button_type_primary');
const inputPopupProffession = formPopupProfile.querySelector('#name-proffession');
const formPopupProffessionError = formPopupProfile.querySelector(`.${inputPopupProffession.id}-error`);
const btnProfileSave = formPopupProfile.querySelector('.button_type_primary');



// ДЗ: выбраеть следующее поле ввода Профессия
// Воспользоваться функциями для поля ввода профессия

/*
1. Выбираем поля ввода
2. Вешаем обработчик события, который срабатывает при вводе текста в поле ввода
   В момент ввода текста, вызываем ф-цию isValid и в ней проверяем, что
   Если ввод корректный (согласно атрибутам в разметке), то убираем ошибку
   Иначе
     показываем ошибку


*/


// ------- 
formPopupProfile.addEventListener('submit', function(event){
    event.preventDefault();
});


//                                 поле ввода     спан
const showInputError = function(inputElement, errorElement){
    inputElement.classList.add('form__input_type_error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = function(inputElement, errorElement){
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
}

const isValid = function(formInput, formError){
    if(!formInput.validity.valid){
        showInputError(formInput, formError);
        btnProfileSave.setAttribute('disabled', '')
    } else {
        hideInputError(formInput, formError);
        btnProfileSave.removeAttribute('disabled', '')
    } 
}

/// ------>

// 
formInputPopupProfile.addEventListener("input", function (evt) {
   isValid(formInputPopupProfile, formPopupError);   // isValid(formInputPopupProfile)
});

inputPopupProffession.addEventListener("input", function(evt) {
    isValid(inputPopupProffession, formPopupProffessionError);
});




