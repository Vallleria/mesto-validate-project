/*
1. получить доступ к секции profile
2. из секции profile получить img.avatar
3. загрузить данные 
   -  сперва проверитьв консоли, что данные профиля были успешно получены и отобразить
   - обновить информацию в секции profile
     - обновить авара
     - имя
     - профессия

Обновление аватарки
Обработать отправку данных формой при клике на кнопку Сохранить
1. Получить форму и добавить обработчик события при отпарвке формы
2. Получить поле ввода url
3. После успешной проверки url, получаем его и отправляем на сервер при помощи patchProfileAvatar()
4. Обновить аватар после успешной отправки на сервер
*/
import { fetchProfile } from './api.js';

const profileSection = document.querySelector('.profile');
const profileImage = profileSection.querySelector('.profile__image');
const profileTitle = profileSection.querySelector('.profile__title');
const profileSubtitle = profileSection.querySelector('.profile__subtitle');

// обновить данные профиля на странице.
// profile - объект данных с сервера
const updatePageProfile = (profile) =>{
  profileImage.src = profile.avatar;
  profileImage.alt = profile.name;
  profileTitle.textContent = profile.name;
  profileSubtitle.textContent = profile.about;
}

fetchProfile().then(updatePageProfile).catch((err) => {
  console.log(err)
});


export {
  updatePageProfile 
}


