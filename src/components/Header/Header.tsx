import React from 'react';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import styles from './style.module.scss';
import { slide as Menu } from 'react-burger-menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as routes from '../../utils/consts';
import cn from 'classnames';

const Header = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const menuStyles = {
    bmBurgerButton: {
      position: 'absolute',
      width: '36px',
      height: '30px',
      right: '0px',
      top: '0px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '40px',
      width: '40px',
      right: '25px',
      top: '0px'
    },
    bmMenuWrap: {
      position: 'fixed',
      top: '0px',
      height: '100%'
    },
    bmMenu: {
      background: 'linear-gradient(90deg, #925ED6 0%, #15ABC7 100%)',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
      height: 'fit-content'
    },
    bmItem: {
      display: 'block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      top: '0px',
      left: '0px'
    }
  }

  return (
    <>
      <header className={styles.header}>
          <img src='/assets/icons/owl1.svg' alt='Logo'
            onClick={() => navigate(routes.PATH_HOME)}
          />
          <div className={styles.burgerWrapper}>
            <Menu styles={menuStyles}
                  right
                  customBurgerIcon={<IoIosMenu />}
                  customCrossIcon={<IoMdClose color={"#FFFFFF"}/>}
            >
              <Link id='story' className={cn(styles.menuItem, {[styles.active]: pathname.includes('story')})} to={routes.PATH_OUR_STORY}>Story</Link>
              <Link id='leaderboard' className={cn(styles.menuItem, {[styles.active]: pathname.includes('leaderboard')})} to={routes.PATH_LEADERBOARD}>Leaderboard</Link>
              <Link id='home' className={cn(styles.menuItem, {[styles.active]: pathname === '/'})} to={routes.PATH_HOME}>Home</Link>
              <Link id='rules' className={cn(styles.menuItem, {[styles.active]: pathname.includes('rules')})} to={routes.PATH_RULES}>Rules</Link>
            </Menu>
          </div>
      </header>
    </>
  );
};

export default Header;
