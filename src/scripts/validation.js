/*
1. Выбираем все форме
2. В цикле из формы достанем input и span куда выведем ошибку
3. В цикле каждому input-у добавляем в качестве обраточки ф-цию isValidPlace
*/


const validationConfig = {
    formSelector: '.form',
    formInputSelector: '.form__input',
    buttonTypePrimarySelector: '.button_type_primary',
    formInputTypeError: 'form__input_type_error',
    formInputErrorActive: 'form__input-error_active'
}


const checkValidInputs = function(formElement, config) {

    const inputs = formElement.querySelectorAll(config.formInputSelector);

    inputs.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkEmptyInputs(formElement, true, config)
        });
    })
}

const checkEmptyInputs = function(formElement, showErrors, config) {
    const inputs = formElement.querySelectorAll(config.formInputSelector);
    const btnSave = formElement.querySelector(config.buttonTypePrimarySelector);

    const invalidInputs = Array.from(inputs).filter(function(input) {
        return !input.validity.valid
    });
    const validInputs = Array.from(inputs).filter(function(input) {
        return input.validity.valid
    });

    validInputs.forEach(function (input) {
        const errorSpan = formElement.querySelector(`.${input.id}-error`);
        hideInputError(input, errorSpan, config);
    });

    if (invalidInputs.length > 0) {
        if (showErrors) {
            invalidInputs.forEach(function (input) {
                const errorSpan = formElement.querySelector(`.${input.id}-error`);
                showInputError(input, errorSpan, config);
            });
        }
        btnSave.setAttribute('disabled', '');
    } else {
        btnSave.removeAttribute('disabled', '');
    }
}

function checkPopupEmptyInputs(popup, config) {
    const form = popup.querySelector(config.formSelector);
    checkEmptyInputs(form, false, config);
}

const resetPopupFormValidation = function (popup, config) {
    const formElement = popup.querySelector(config.formSelector);
    const inputs = formElement.querySelectorAll(config.formInputSelector);
    inputs.forEach(function(input) {
        const errorSpan = formElement.querySelector(`.${input.id}-error`);
        hideInputError(input, errorSpan, config);
    });
}

//                                 поле ввода     спан
const showInputError = function (inputElement, errorElement, config) {
    inputElement.classList.add(config.formInputTypeError);
    errorElement.classList.add(config.formInputErrorActive);
    errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = function (inputElement, errorElement, config) {
    inputElement.classList.remove(config.formInputTypeError);
    errorElement.classList.remove(config.formInputErrorActive);
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




  
const enableValidation = (config) => {
      
      const popupForms = document.querySelectorAll(config.formSelector);
      const getFormList = Array.from(popupForms);
      getFormList.forEach(function (formElement) {
          formElement.addEventListener('submit', (evt) => {
              evt.preventDefault();
          });
          checkValidInputs(formElement, config);
      })
};



// Array.from(popupForms).forEach(function (formElement) {
//     formElement.addEventListener('submit', function (event) {
//         event.preventDefault();                                 // отменить отправку данных
//     });

//     checkValidInputs(formElement);
// })

export {
    checkEmptyInputs,
    checkPopupEmptyInputs,
    resetPopupFormValidation,
    enableValidation,
    validationConfig
}