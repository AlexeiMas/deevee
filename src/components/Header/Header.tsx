import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import styles from './style.module.scss';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  return (
    <>
      <div className={styles.header}>
        <img src='/assets/icons/owl1.svg' alt='Logo' />
        {/*<IoIosMenu onClick={() => setIsMenu(prevState => !prevState)} fontSize={32} color={'#6F5F6A'} />*/}
      {/*</div>*/}
      {/*{isMenu &&*/}
      <Menu right isOpen={isMenu} customBurgerIcon={<IoIosMenu fontSize={32} color={'#6F5F6A'}/>}>
        <Link id='home' className='menu-item' to='/'>Home</Link>
        <Link id='about' className='menu-item' to='/game'>Game</Link>
        <Link id='contact' className='menu-item' to='/contact'>Contact</Link>
        {/*<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>*/}
      </Menu>
      </div>
      {/*}*/}
    </>
  );
};

export default Header;
