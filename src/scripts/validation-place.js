const formPopupPlace = document.querySelector('.image-popup__form');
const formInputPlace = formPopupPlace.querySelector('.form__input');
const formPopupPlaceError = formPopupPlace.querySelector(`.${formInputPlace.id}-error`);
const formPopupPlaceButton = formPopupPlace.querySelector('.button_type_primary');

const inputPopupPlace = formPopupPlace.querySelector('#url-input');
const formPopupUrlError = formPopupPlace.querySelector(`.${inputPopupPlace.id}-error`);
const btnPlaceSave = formPopupPlace.querySelector('.button_type_primary');


formPopupPlace.addEventListener('submit', function (event) {
  event.preventDefault();
});


//                                 поле ввода     спан
const showInputErrorPlace = function (inputElement, errorElement) {
  inputElement.classList.add('form__input_type_error');
  errorElement.classList.add('form__input-error_active');
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputErrorPlace = function (inputElement, errorElement) {
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
}

const isValidPlace = function (formInput, formError) {
  if (!formInput.validity.valid) {
    showInputErrorPlace(formInput, formError);
    btnPlaceSave.setAttribute('disabled', '')
  } else {
    hideInputErrorPlace(formInput, formError);
    btnPlaceSave.removeAttribute('disabled', '')
  }
}

/// ------>

// 
formInputPlace.addEventListener("input", function (evt) {
  isValidPlace(formInputPlace, formPopupPlaceError);   // isValid(formInputPopupProfile)
});

inputPopupPlace.addEventListener("input", function (evt) {
  isValidPlace(inputPopupPlace, formPopupUrlError);
});










const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
};



