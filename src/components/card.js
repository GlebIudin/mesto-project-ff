function deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  function toggleLike(evt) {
         evt.target.classList.toggle("card__like-button_is-active");
       }

  function createCard(link, name, deleteCard, openCardPopup, toggleLike) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
    const cardPic = cardClone.querySelector('.card__image');
    const cardTitle = cardClone.querySelector('.card__title');
    const likeButton = cardClone.querySelector('.card__like-button');
    const deleteButton = cardClone.querySelector('.card__delete-button');

    cardPic.src = link;
    cardPic.alt = name;
    cardTitle.textContent = name;

    cardPic.addEventListener('click', () => {
        openCardPopup(name, link);
    });
    likeButton.addEventListener('click', toggleLike);
    deleteButton.addEventListener('click', deleteCard);

    return cardClone
  }

  export { deleteCard, toggleLike, createCard }