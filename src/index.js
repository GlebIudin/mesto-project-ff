import { initialCards } from "./components/cards.js";
import { openModal, closeModal, closeModalByOverlay, closeModalByEsc } from "./components/modal.js";
import { deleteCard, createCard, toggleLike } from "./components/card.js";
import './pages/index.css';

const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const photoAddButton = document.querySelector('.profile__add-button');
const photoAddPopup = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileForm = document.querySelector('#profileForm');
const cardPopup = document.querySelector('#cardPopup');
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const placesList = document.querySelector(".places__list");
const photoURLInput = document.querySelector('#photoURLInput');
const photoTitleInput = document.querySelector('#photoTitleInput');

// Заполнение инпутов при открытие формы редактирования name/job

function fillProfileFormInputs() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

//Код отвечающий за открытие и закрытие модальных окон

profileEditButton.addEventListener('click', () => {
    fillProfileFormInputs()
    openModal(profilePopup);
})

photoAddButton.addEventListener('click', () => {
    openModal(photoAddPopup);
})

// Закрытие по клику на крестик

popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(popup));
})

// Закрытие по оверлэю

profilePopup.addEventListener('click', closeModalByOverlay);
photoAddPopup.addEventListener('click', closeModalByOverlay);
cardPopup.addEventListener('click', closeModalByOverlay)

// Сохранение инфы профиля

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    
    closeModal(profilePopup);
  }

  profileForm.addEventListener('submit', handleFormSubmitProfile);

// Вывели карточки на страницу

initialCards.forEach(function ({ link, name }) {
    const newCard = createCard(link, name, deleteCard, openCardPopup, toggleLike);
    placesList.append(newCard);
  });

  // Открытие попапа с фото

  function openCardPopup(name, link) {
    popupCardImage.src = link;
    popupCaption.textContent = name;
    popupCardImage.alt = name;
    openModal(cardPopup)
  }

// Запостить фото

photoAddPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const photoName = photoTitleInput.value;
  const photoURL = photoURLInput.value;

  const post = createCard(photoURL, photoName, deleteCard, openCardPopup, toggleLike);
  placesList.prepend(post)
  
  closeModal(photoAddPopup);
  evt.target.reset()
})