import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy, AiOutlineLinkedin } from 'react-icons/ai';
import { FiMail, FiGithub, FiFileText } from 'react-icons/fi';

import './Footer.css';

export const Footer = () => {
  const [isCopyingEmailFooter, setIsCopyingEmailFooter] = useState(false);
  const location = useLocation();

  const copyEmailAddressClickHandler = () => {
    setIsCopyingEmailFooter(true);

    const interval = setInterval(() => {
      setIsCopyingEmailFooter(false);
      clearIntervalFunction(interval);
    }, 1500);

    const clearIntervalFunction = (intervalToClear) => {
      clearInterval(intervalToClear);
    };
  };

  // No mostrar el footer en las rutas /login y /registerAccount
  if (
    location.pathname === '/login' ||
    location.pathname === '/registerAccount'
  ) {
    return null;
  }

  return (
    <div className='footerContainer'>
      <div className='line'></div>
      <div className='contactFooterGrid'>
        {isCopyingEmailFooter === false ? (
          <CopyToClipboard text='esteban.altamura@gmail.com'>
            <button
              className='footerContact footerMail'
              onClick={copyEmailAddressClickHandler}
            >
              <FiMail className='footerMailIcon' />
              esteban.altamura@gmail.com
              <AiFillCopy className='footerMailCopyIcon' />
            </button>
          </CopyToClipboard>
        ) : (
          <p className='copiedMessage'>Copied!</p>
        )}

        <span className='footerDivider'>|</span>

        <a
          className='footerContact  footerGit'
          href='https://github.com/estebanaltamura/flixfinder'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FiGithub className='footerGitIcon' />
          GitHub
        </a>

        <span className='footerDivider'>|</span>

        <a
          className='footerContact  footerLinkedin'
          href='https://www.linkedin.com/in/andres-altamura/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <AiOutlineLinkedin className='footerLinkedinIcon' />
          Linkedin
        </a>

        <span className='footerDivider'>|</span>

        <a
          className='footerContact  footerCV'
          href='https://drive.google.com/file/d/1X7VTxJ9HQAAyqZxnQPZNpxsI3RsJtpG7/view?usp=drive_link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FiFileText className='footerCVIcon' />
          Curriculum Vitae
        </a>
      </div>
    </div>
  );
};
