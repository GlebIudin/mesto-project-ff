function toggleLike(cardLikeButton) {
  cardLikeButton.classList.add("card__like-button_is-active");
}

function untoggleLike(cardLikeButton) {
  cardLikeButton.classList.remove("card__like-button_is-active");
}

function createCard(cardInfo, userId, deleteCardCallback, openCardPopup, toggleLikeCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPic = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const likeButton = cardClone.querySelector('.card__like-button');
  const deleteButton = cardClone.querySelector('.card__delete-button');
  const likeAmount = cardClone.querySelector('.card__like-amount');

  cardPic.src = cardInfo.link;
  cardPic.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  likeAmount.textContent = cardInfo.likes.length;

  cardPic.addEventListener('click', () => {
    openCardPopup(cardInfo.name, cardInfo.link);
  });

  if (cardInfo.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => {
      deleteCardCallback(cardInfo._id, evt) 
    });
  } else {
    deleteButton.remove();
  }
  
  let pushedLike = cardInfo.likes.some((like) =>
    like._id === userId);

  if (pushedLike) {
    toggleLike(likeButton);
  }

  likeButton.addEventListener("click", () => {
    toggleLikeCallback(cardInfo._id, likeAmount, likeButton, pushedLike)
  });

  return cardClone
}

export { createCard, toggleLike, untoggleLike }