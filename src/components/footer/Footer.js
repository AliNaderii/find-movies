// styles
import './Footer.scss';
// icons
import { AiOutlineGithub, AiOutlineMail, AiOutlineMobile } from 'react-icons/ai';

export default function Footer() {
  return (
    <div className="footer-container">
      <p className='footer-info'>
        ©2022, Find Me The Show, Inc
      </p>
      <div className="contact-container">
        <a
          href='https://github.com/AliNaderii'
          target='_blank'
          rel='noreferrer'
        >
          <AiOutlineGithub />
        </a>
        <a href='mailto:ali.naderi72@gmail.com'>
          <AiOutlineMail />
        </a>
        <a href='tel:09383086248'><AiOutlineMobile /></a>
      </div>
    </div >
  );
}