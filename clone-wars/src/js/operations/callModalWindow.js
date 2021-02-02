function callModalWindow() {
  const popUp = document.querySelector('#popUp');
  const modalWindow = document.querySelector('#modalWindow');
  const modalCancel = document.querySelector('#modal-cancel');

  popUp.classList.add('popUp-visible');
  modalWindow.classList.remove('modalWindow');

  modalCancel.addEventListener('click', cancelModal);
}

function cancelModal() {
  popUp.classList.remove('popUp-visible');
  modalWindow.classList.add('modalWindow');
}

export { callModalWindow, cancelModal };