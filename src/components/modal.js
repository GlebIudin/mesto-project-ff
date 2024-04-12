function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEsc);
};

function closeModal(popup) {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeModalByEsc);
};

// Функция закрытия попапа по клику на оверлэй

const closeModalByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target)
    }
}

// Функция закрытия попапа по щелчку ескейпа

const closeModalByEsc = (evt) => {
    if (evt.code === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        closeModal(openedModal);
    }
}

export { openModal, closeModal, closeModalByOverlay, closeModalByEsc };