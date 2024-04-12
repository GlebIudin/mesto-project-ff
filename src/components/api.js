//Токен: e8b07c05-c092-49e4-a730-39009af70ab3
//Идентификатор группы: wff-cohort-10

const BASE_URL = 'https://mesto.nomoreparties.co/v1/wff-cohort-10'
const authKey = 'e8b07c05-c092-49e4-a730-39009af70ab3'

const handleRequest = (res) => {
    if (res.ok) {
        return res.json();
    }
    throw new Error(res.status);
}

export const getCardsArray = (card) => {
    return fetch(BASE_URL + "/cards", {
        method: 'GET',
        headers: {
            authorization: authKey
        }
    })
        .then(handleRequest)
}

export const getUserInfo = (user) => {
    return fetch(BASE_URL + "/users/me", {
        method: 'GET',
        headers: {
            authorization: authKey
        }
    })
        .then(handleRequest)
}

export const postCard = (data) => {
    return fetch(BASE_URL + "/cards", {
        method: 'POST',
        headers: {
            authorization: authKey,
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(handleRequest)
}

export const deleteCard = (id) => {
    return fetch(BASE_URL + `/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: authKey,
            "Content-type": "application/json"
        },
    })
        .then(handleRequest)
}

export const changeUserInfo = (data) => {
    return fetch(BASE_URL + "/users/me", {
        method: 'PATCH',
        headers: {
            authorization: authKey,
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(handleRequest)
}

export const changeUserAvatar = (avatarLink) => {
    return fetch(BASE_URL + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: authKey,
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            avatar: `${avatarLink}`
        })
    })
        .then(handleRequest)
}

export const sendToggleLike = (id) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-10/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: authKey,
            "Content-type": "application/json"
        },
    })
        .then(handleRequest)
}

export const sendUntoggleLike = (id) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-10/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: authKey,
            "Content-type": "application/json"
        },
    })
        .then(handleRequest)
}