const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
    headers: {
        authorization: 'ea8c1163-cccd-4399-b8e7-d9e45c9dcbeb',
        'Content-Type': 'application/json'
    }
}

const handleResponse = (response) => {
    if(response.ok){
        return response.json();  // -> jsonPromise!
    } 

    return response.json().then((errorData) => {
        return Promise.reject(`Статус: ${response.status} Error: ${errorData.message}`);
    });
}
// получить карточки
const fetchInitialCards = () => {
    //          url                          parameters
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(handleResponse)
}
// получить профиль
const fetchProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(handleResponse)
}
// обновить аватар
const patchProfileAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, { 
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    }).then(handleResponse)
}

const patchProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    }).then(handleResponse)
    
}
const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`,{
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        })
    }).then(handleResponse)
    
}
const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`,{
        method: 'DELETE',
        headers: config.headers,


     
    }).then(handleResponse)
    
}
const putCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`,{
        method: 'PUT',
        headers: config.headers,


     
    }).then(handleResponse)
    
}
const deleteCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`,{
        method: 'DELETE',
        headers: config.headers,
     
    }).then(handleResponse)
    
}


export {
    fetchInitialCards,
    fetchProfile,
    patchProfileAvatar,
    patchProfileInfo,
    postNewCard,
    deleteCard,
    putCardLike,
    deleteCardLike

}

// .then(res => {
//     if (res.ok) {
//       return res.json();
//     }

//     // если ошибка, отклоняем промис
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// } 