/*
1. Выбираем все форме
2. В цикле из формы достанем input и span куда выведем ошибку
3. В цикле каждому input-у добавляем в качестве обраточки ф-цию isValidPlace
*/


const popupForms = document.querySelectorAll('.form');


const checkValidInputs = function(formElement) {
    const inputs = formElement.querySelectorAll('.form__input');

    inputs.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkEmptyInputs(formElement)
        });
    })
}

const checkEmptyInputs = function(formElement, showErrors=true) {
    const inputs = formElement.querySelectorAll('.form__input');
    const btnSave = formElement.querySelector('.button_type_primary');

    const invalidInputs = Array.from(inputs).filter(function(input) {
        return !input.validity.valid
    });
    const validInputs = Array.from(inputs).filter(function(input) {
        return input.validity.valid
    });

    validInputs.forEach(function (input) {
        const errorSpan = formElement.querySelector(`.${input.id}-error`);
        hideInputError(input, errorSpan);
    });

    if (invalidInputs.length > 0) {
        if (showErrors) {
            invalidInputs.forEach(function (input) {
                const errorSpan = formElement.querySelector(`.${input.id}-error`);
                showInputError(input, errorSpan);
            });
        }
        btnSave.setAttribute('disabled', '');
    } else {
        btnSave.removeAttribute('disabled', '');
    }
}

const resetFormValidation = function (formElement) {
    const inputs = formElement.querySelectorAll('.form__input');
    inputs.forEach(function(input) {
        const errorSpan = formElement.querySelector(`.${input.id}-error`);
        hideInputError(input, errorSpan);
    });
}

//                                 поле ввода     спан
const showInputError = function (inputElement, errorElement) {
    inputElement.classList.add('form__input_type_error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = function (inputElement, errorElement) {
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
}

// const isValid = function (formInput, btnSave, formError) {
//     if (!formInput.validity.valid) {
//         if (formError){
//             showInputError(formInput, formError);
//         }
//         btnSave.setAttribute('disabled', '')
//     } else {
//         if (formError) {
//             hideInputError(formInput, formError);
//         }
//         btnSave.removeAttribute('disabled', '')
//     }
// }

Array.from(popupForms).forEach(function (formElement) {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();                                 // отменить отправку данных
    });

    checkValidInputs(formElement);
})

export {
    checkEmptyInputs,
    resetFormValidation
}