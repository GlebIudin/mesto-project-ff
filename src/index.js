import {
  closeModal,
  closeModalByOverlay,
  openModal,
} from "./components/modal.js";

import { createCard, toggleLike, untoggleLike } from "./components/card.js";

import "./pages/index.css";

import {
  deleteCard, getCardsArray, getUserInfo, postCard,
  changeUserInfo, changeUserAvatar, sendToggleLike,
  sendUntoggleLike
} from "./components/api.js";

import { enableValidation, clearValidation } from "./components/validation.js";

const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const photoAddButton = document.querySelector(".profile__add-button");
const photoAddPopup = document.querySelector(".popup_type_new-card");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const profileForm = document.querySelector("#profileForm");
const cardPopup = document.querySelector("#cardPopup");
const popupCardImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const photoURLInput = document.querySelector("#photoURLInput");
const photoTitleInput = document.querySelector("#photoTitleInput");
let id;
const changeAvatarButton = document.querySelector('.profile__avatar-section');
const changeAvatarPopup = document.querySelector('#changeAvatarPopup');
const avatarInput = document.querySelector('#avatarLinkInput')
const changeAvatarForm = document.querySelector('#changeAvatarForm')
const addPhotoForm = document.querySelector('#addPhotoForm');

// конфиг валидации

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__input-error_active'
};

// Выведение карточек на страницу и подгрузка инфы юзера

Promise.all([
  getCardsArray(),
  getUserInfo(),
])
  .then(([cards, user]) => {
    userName.textContent = user.name;
    userJob.textContent = user.about;
    userAvatar.src = user.avatar;
    id = user._id;

    cards.forEach((data) => {
      const newCard = createCard(
        data,
        id,
        deleteCardCallback,
        openCardPopup,
        toggleLikeCallback,
        data.likes
      );
      placesList.append(newCard);
    });
  })
  .catch((error) => {
    console.log(error)
  })

const deleteCardCallback = (id, evt) => {
  deleteCard(id)
    .then(() => evt.target.closest(".card").remove())
    .catch((err) => console.log(err));
}

// Функционал лайка карточки

function toggleLikeCallback(id, likeAmount, likeButton, pushedLike) {
  if(!likeButton.classList.contains('card__like-button_is-active')) {
    sendToggleLike(id)
    .then((res) => {
      toggleLike(likeButton);
      likeAmount.textContent = res.likes.length;
      pushedLike = true;
    })
    .catch((err) => console.log(err))
  } else {
    sendUntoggleLike(id)
    .then((res) => {
      untoggleLike(likeButton);
      likeAmount.textContent = res.likes.length;
      pushedLike = false;
    })
    .catch((err) => console.log(err))
  }
}

// Заполнение инпутов при открытие формы редактирования name/job

function fillProfileFormInputs() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

//Код отвечающий за открытие и закрытие модальных окон

profileEditButton.addEventListener("click", () => {
  const form = profilePopup.querySelector(config.formSelector)
  clearValidation(form, config)
  fillProfileFormInputs();
  openModal(profilePopup);
});

photoAddButton.addEventListener("click", () => {
  clearValidation(addPhotoForm, config)
  const form = photoAddPopup.querySelector(config.formSelector)
  clearValidation(form, config)
  openModal(photoAddPopup);
});

changeAvatarButton.addEventListener("click", () => {
  clearValidation(changeAvatarForm, config)
  const form = changeAvatarPopup.querySelector(config.formSelector)
  clearValidation(form, config)
  openModal(changeAvatarPopup)
});

// Закрытие по клику на крестик

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

// Закрытие по оверлэю

profilePopup.addEventListener("click", closeModalByOverlay);
photoAddPopup.addEventListener("click", closeModalByOverlay);
cardPopup.addEventListener("click", closeModalByOverlay);
changeAvatarPopup.addEventListener('click', closeModalByOverlay)

// Сохранение инфы профиля

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  renderLoading(evt, true);
  changeUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((res) => {
      userName.textContent = res.name,
        userJob.textContent = res.about
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      renderLoading(evt, false)
    })

  closeModal(profilePopup);
}

profileForm.addEventListener("submit", handleFormSubmitProfile);

// Смена аватара

function changeAvatar(evt, avatarLink) {
  avatarLink = avatarInput.value;
  evt.preventDefault();
  renderLoading(evt, true)

  changeUserAvatar(avatarLink)
    .then((res) => {
      userAvatar.src = res.avatar
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      renderLoading(evt, false)
    })

  closeModal(changeAvatarPopup)
}
changeAvatarForm.addEventListener('submit', changeAvatar)

// Открытие попапа с фото

function openCardPopup(name, link) {
  popupCardImage.src = link;
  popupCaption.textContent = name;
  popupCardImage.alt = name;
  openModal(cardPopup);
}

// Запостить фото

photoAddPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(evt, true)
  const photoName = photoTitleInput.value;
  const photoURL = photoURLInput.value;

  postCard({
    link: photoURL,
    name: photoName,
  })
    .then((data) => {
      const post = createCard(
        data,
        id,
        deleteCardCallback,
        openCardPopup,
        toggleLikeCallback,
        data.likes
      );

      placesList.prepend(post);
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      renderLoading(evt, false)
    })
  closeModal(photoAddPopup);
  evt.target.reset();
});

enableValidation(config)

// Загрузка на время отправки запроса

function renderLoading(evt, isLoading) {
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
}

