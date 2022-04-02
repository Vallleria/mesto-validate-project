/*
1. Выбираем все форме
2. В цикле из формы достанем input и span куда выведем ошибку
3. В цикле каждому input-у добавляем в качестве обраточки ф-цию isValidPlace
*/

const popupForms = document.querySelectorAll('.form');

Array.from(popupForms).forEach(function(formElement){
    formElement.addEventListener('submit', function(event){
        event.preventDefault();                                 // отменить отправку данных
    });

    // получаем кнопку сохранить внутри формы
    const btnSave = formElement.querySelector('.button_type_primary');

    // получим все поля ввода из формы
    const inputs = formElement.querySelectorAll('.form__input');
    // в цикле каждому полю ввода добавить обработчик события
    inputs.forEach(function(inputElement) {
        const errorSpan = formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.addEventListener('input', function(){
             isValid(inputElement, errorSpan, btnSave);
        })
    })
    
    
   
})



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

const isValid = function(formInput, formError, btnSave){
    if(!formInput.validity.valid){
        showInputError(formInput, formError);
        btnSave.setAttribute('disabled', '')
    } else {
        hideInputError(formInput, formError);
        btnSave.removeAttribute('disabled', '')
    } 
}