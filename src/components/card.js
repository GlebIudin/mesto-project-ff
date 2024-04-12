function toggleLike(cardLikeButton) {
  cardLikeButton.classList.add("card__like-button_is-active");
}

function untoggleLike(cardLikeButton) {
  cardLikeButton.classList.remove("card__like-button_is-active");
}

function createCard(cardInfo, userId, deleteCardHandler, openCardPopup, toggleLikeHandler, likes) {
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
  likeAmount.textContent = likes.length;

  cardPic.addEventListener('click', () => {
    openCardPopup(cardInfo.name, cardInfo.link);
  });

  if (cardInfo.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => {
      evt.target.closest(".card").remove();
      deleteCardHandler(cardInfo._id);
    });
  } else {
    deleteButton.remove();
  }
  let pushedLike = likes.some((like) =>
    like._id === userId);

  if (pushedLike) {
    toggleLike(likeButton);
  }
  likeButton.addEventListener("click", () => {
    toggleLikeHandler(cardInfo._id, pushedLike)
      .then(() => {
        if (!pushedLike) {
          toggleLike(likeButton);
          likeAmount.textContent = Number(likeAmount.textContent) + 1;
          pushedLike = true;
        } else {
          untoggleLike(likeButton);
          likeAmount.textContent = Number(likeAmount.textContent) - 1;
          pushedLike = false;
        }
      });
  });

  return cardClone
}

export { createCard }