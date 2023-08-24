import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiMail, FiGithub } from "react-icons/fi";
import { AiFillCopy } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import "./Footer.css";

export const Footer = () => {
  const [isCopyingEmailFooter, setIsCopyingEmailFooter] = useState(false);

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

  return (
    <div className="footerContainer">
      <div className="line"></div>
      <div className="contactFooterGrid">
        {isCopyingEmailFooter == false ? (
          <CopyToClipboard text="esteban.altamura@gmail.com">
            <button
              className="footerContact footerMail"
              onClick={copyEmailAddressClickHandler}
            >
              <FiMail className="footerMailIcon" />
              esteban.altamura@gmail.com
              <AiFillCopy className="footerMailCopyIcon" />
            </button>
          </CopyToClipboard>
        ) : (
          <p className="copiedMessage">Copied!</p>
        )}

        <span className="footerDivider">|</span>

        <a
          className="footerContact  footerGit"
          href="https://github.com/estebanaltamura/flixfinder"
          target="_blank"
        >
          <FiGithub className="footerGitIcon" />
          GitHub
        </a>

        <span className="footerDivider">|</span>

        <a
          className="footerContact  footerLinkedin"
          href="https://www.linkedin.com/in/andres-altamura/"
          target="_blank"
        >
          <AiOutlineLinkedin className="footerLinkedinIcon" />
          Linkedin
        </a>

        <span className="footerDivider">|</span>

        <a
          className="footerContact  footerCV"
          href="https://drive.google.com/file/d/19E5Ry7_NDwi5BBaT8rDytLdkAKF2rwyY/view?usp=sharing"
          target="_blank"
        >
          <FiFileText className="footerCVIcon" />
          Curriculum Vitae
        </a>
      </div>
    </div>
  );
};
