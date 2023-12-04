import { useState } from 'react';
import '../css/AccountButton.css'
import accountDefault from '../assets/img/account.svg'
import plus from '../assets/img/plus.svg'
import logout from '../assets/img/logout.svg'


function AccountButton() {

  const [showModalAccount, setShowModalAccount] = useState(false);

  const openModal = () => {
    setShowModalAccount(true);
 };

 const closeModal = () => {
  setShowModalAccount(false);
 };

  return (
    <>
      <button className="button-login" onClick={openModal}>Login</button>
      {showModalAccount ? (
        <div className="modal-login">
          <div className="modal-content-login">
            <div className="header-modal-login">
              <h2 className="mail-login">correo@prueba.com</h2>
              <span className="close-login" onClick={closeModal}>
              &times;
              </span>
            </div>
            <div className="avatar-container">
              <img className='avatar-account' src={accountDefault} alt='accountDefault'/>
            </div>
            <p className='greentings-login'> ¡Hola, Usuario!</p>
            <button className='manage-button'> Gestionar tu cuenta </button>
            <div className='button-columns'>
              <button className='left-button'>
              <img className='icon-modal-login' src={plus} alt='plus-account'/>
                Añadir cuenta
              </button>
              <button className='right-button'>
              <img className='icon-modal-login' src={logout} alt='logout-account'/>

                Cerrar cuenta
              </button>
            </div>
            <div className='footer-login'>
              <p>Política de Privacidad • Términos del Servicio</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AccountButton
