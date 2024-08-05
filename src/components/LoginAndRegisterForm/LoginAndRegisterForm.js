import { useContext, useEffect, useState, useRef } from 'react';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

import { ContentLikedContext } from '../../contexts/ContentLikedContextProvider';
import { IsLoadingContext } from '../../contexts/IsLoadingContextProvider';
import { TokenContext } from '../../contexts/TokenContextProvider';
import { useFormElementsBehavior } from '../../hooks/useFormElementsBehavior';
import { useLoginValidator } from '../../hooks/useLoginValidator';
import { useCreateAccount } from '../../services/internal/useCreateAccount';
import { useGetContentLiked } from '../../services/internal/useGetContentLiked';
import { useLogin } from '../../services/internal/useLogin';
import logo from '../../assets/logo.svg';
import './LoginAndRegisterForm.css';

export const LoginAndRegisterForm = () => {
  const { setToken } = useContext(TokenContext);
  const { setContentLiked } = useContext(ContentLikedContext);
  const { setIsLoading } = useContext(IsLoadingContext);
  const [section, setSection] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { getContentLikedServer } = useGetContentLiked();

  const {
    userNameAlert,
    passwordAlert,
    areValidEntries,
    setAlerts,
    resetAlerts,
  } = useLoginValidator();

  const {
    setStylesElementsWaiting,
    setStylesElementsLoginRejected,
    setStylesElementsRegisterRejected,
  } = useFormElementsBehavior();

  const { getToken } = useLogin();
  const { createAccount } = useCreateAccount();

  const history = useNavigate();
  const url = useLocation();

  const userNameInput = useRef();
  const passwordInput = useRef();
  const submitButton = useRef();

  const loginRegisterFormSubmitClickHandler = async (event) => {
    event.preventDefault();
    const urlInParts = url.pathname.split('/');

    const userName = event.target.username.value;
    const userNameHandled = userName.trim().toLowerCase();
    const password = event.target.password.value;

    if (!areValidEntries(event)) {
      setAlerts(event);
    } else if (urlInParts.includes('login')) {
      setStylesElementsWaiting(
        userNameInput.current,
        passwordInput.current,
        submitButton.current
      );

      const getTokenData = await getToken(userNameHandled, password);
      if (getTokenData) {
        const getContentLikedServerData = await getContentLikedServer(
          getTokenData
        );
        if (getTokenData && getContentLikedServerData) {
          setIsLoading(true);
          setToken(getTokenData);
          setContentLiked(getContentLikedServerData);
          localStorage.setItem('token', JSON.stringify(getTokenData));
          localStorage.setItem(
            'contentLiked',
            JSON.stringify(getContentLikedServerData)
          );
          console.log(
            'setea token en contexto y local storage, setea liked context desde login'
          );
          history('/movies');
        } else {
          setStylesElementsLoginRejected(
            userNameInput.current,
            passwordInput.current,
            submitButton.current
          );
        }
      } else
        setStylesElementsLoginRejected(
          userNameInput.current,
          passwordInput.current,
          submitButton.current
        );
    } else if (urlInParts.includes('registerAccount')) {
      setStylesElementsWaiting(
        userNameInput.current,
        passwordInput.current,
        submitButton.current
      );

      const wasSuccessfulCreateAccount = await createAccount(
        userNameHandled,
        password
      );
      if (wasSuccessfulCreateAccount) {
        history('/login');
      } else {
        setStylesElementsRegisterRejected(
          userNameInput.current,
          passwordInput.current,
          submitButton.current
        );
      }
    }
  };

  const redirectToLoginOrRegister = () => {
    const urlInParts = url.pathname.split('/');

    if (urlInParts.includes('login')) {
      history('/registerAccount');
    }
    if (urlInParts.includes('registerAccount')) {
      history('/login');
    }
  };

  const resetAlertWhenFocusInInput = (event) => {
    event.target.nodeName === 'INPUT' && resetAlerts();
  };

  const showpasswordClickHandler = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const urlInParts = url.pathname.split('/');

    if (urlInParts.includes('login')) {
      setSection('login');
    }

    if (urlInParts.includes('registerAccount')) {
      setSection('registerAccount');
    }
    // eslint-disable-next-line
  }, [url]);

  return (
    <div className='form-container' onClick={resetAlertWhenFocusInInput}>
      <div className='iconAndTitleContainer'>
        <img src={logo} alt='logo' style={{ width: '50px' }} />
        <h3 className='formTitle'>
          {section === 'login'
            ? 'Good to see you again!'
            : 'Create your account'}
        </h3>
      </div>
      <form
        action='/action_page.php'
        onSubmit={loginRegisterFormSubmitClickHandler}
        className='loginAndRegisterForm'
      >
        <div
          className={
            userNameAlert === '' ? 'inputContainer' : 'inputContainer shake'
          }
        >
          <input
            type='text'
            name='username'
            ref={userNameInput}
            className='inputForm inputFormUserName'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='none'
            placeholder='E-mail'
          />
        </div>
        <span className='inputAlerts'>{userNameAlert}</span>

        <div
          className={
            passwordAlert === '' ? 'inputContainer' : 'inputContainer shake'
          }
        >
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            ref={passwordInput}
            className='inputForm'
            autoComplete='off'
            placeholder='Password'
          />
          <>
            {showPassword ? (
              <AiFillEyeInvisible
                className='showPasswordIcon'
                onClick={showpasswordClickHandler}
              />
            ) : (
              <AiFillEye
                className='showPasswordIcon'
                onClick={showpasswordClickHandler}
              />
            )}
          </>
        </div>
        <span className='inputAlerts'>{passwordAlert}</span>

        <button type='submit' className='submitButton' ref={submitButton}>
          {section === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
        </button>
      </form>
      <p className='createAccountLink' onClick={redirectToLoginOrRegister}>
        {section === 'login' ? 'Create an account' : 'Already have an account?'}
      </p>
    </div>
  );
};
