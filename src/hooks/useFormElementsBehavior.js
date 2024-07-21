export const useFormElementsBehavior = () => {
  const setStylesElementsWaiting = (
    userNameInput,
    passwordInput,
    submitButton
  ) => {
    userNameInput.disabled = true;
    passwordInput.disabled = true;
    submitButton.classList.add('waiting');
    submitButton.textContent = 'WAITING...';
    submitButton.disabled = true;
  };

  const setStylesElementsLoginRejected = (
    userNameInput,
    passwordInput,
    submitButton
  ) => {
    userNameInput.disabled = false;
    passwordInput.disabled = false;
    submitButton.disabled = false;
    submitButton.classList.remove('waiting');
    submitButton.textContent = 'LOGIN';
  };

  const setStylesElementsRegisterRejected = (
    userNameInput,
    passwordInput,
    submitButton
  ) => {
    userNameInput.disabled = false;
    userNameInput.value = '';
    passwordInput.disabled = false;
    passwordInput.value = '';
    submitButton.disabled = false;
    submitButton.classList.remove('waiting');
    submitButton.textContent = 'CREATE ACCOUNT';
  };

  return {
    setStylesElementsWaiting,
    setStylesElementsLoginRejected,
    setStylesElementsRegisterRejected,
  };
};
