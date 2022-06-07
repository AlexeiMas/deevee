import React from 'react';
import styles from './style.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_HOME } from '../../utils/consts';

interface IHeader {
  rightCount: number;
}

const Header = ({ rightCount }: IHeader) => {
  const navigate = useNavigate();

  // const menuStyles = {
  //   bmBurgerButton: {
  //     position: 'absolute',
  //     width: 'inherit',
  //     height: 'inherit',
  //     right: '0px',
  //     top: '0px'
  //   },
  //   bmBurgerBars: {
  //     background: '#373a47'
  //   },
  //   bmBurgerBarsHover: {
  //     background: '#a90000'
  //   },
  //   bmCrossButton: {
  //     height: '32px',
  //     width: '32px',
  //     right: '25px',
  //     top: '18px',
  //   },
  //   bmMenuWrap: {
  //     position: 'fixed',
  //     top: '0px',
  //     height: '100%'
  //   },
  //   bmMenu: {
  //     background: 'linear-gradient(90deg, #925ED6 0%, #15ABC7 100%)',
  //     padding: '2.5em 1.5em 0',
  //     fontSize: '1.15em'
  //   },
  //   bmMorphShape: {
  //     fill: '#373a47'
  //   },
  //   bmItemList: {
  //     color: '#b8b7ad',
  //     marginTop: '2rem',
  //     height: 'fit-content'
  //   },
  //   bmItem: {
  //     display: 'block'
  //   },
  //   bmOverlay: {
  //     background: 'rgba(0, 0, 0, 0.3)',
  //     top: '0px',
  //     left: '0px'
  //   }
  // }
  //
  // const handleIsOpen = () => {
  //   setOpen(!isOpen)
  // }
  //
  // const closeSideBar = () => {
  //   setOpen(false)
  // }

  return (
    <>
      <header className={styles.header}>
        <div>
          <img src='/assets/icons/RamenGame.png' alt='Logo' />
          <span>{`${rightCount}/18`}</span>
        </div>
        <div onClick={() => navigate(PATH_HOME)} style={{cursor: 'pointer'}}>
          <img src='/assets/icons/menu.svg' alt='Menu' />
        </div>

        {/*<div className={styles.burgerWrapper}>*/}
        {/*  <Menu styles={menuStyles}*/}
        {/*    right*/}
        {/*    customBurgerIcon={<IoIosMenu strokeWidth={'.9rem'} />}*/}
        {/*    customCrossIcon={<img src='/assets/icons/x.svg' alt='Close' />}*/}
        {/*    disableAutoFocus*/}
        {/*    isOpen={isOpen}*/}
        {/*    onOpen={handleIsOpen}*/}
        {/*    onClose={handleIsOpen}*/}
        {/*  >*/}
        {/*    <Link id='leaderboard' className={cn(styles.menuItem, { [styles.active]: pathname.includes('leaderboard') })} onClick={closeSideBar} to={routes.PATH_LEADERBOARD}>Leaderboard</Link>*/}
        {/*    <Link id='home' className={cn(styles.menuItem, { [styles.active]: pathname === '/' })} onClick={closeSideBar} to={routes.PATH_HOME}>Home</Link>*/}
        {/*    <Link id='rules' className={cn(styles.menuItem, { [styles.active]: pathname.includes('rules') })} onClick={closeSideBar} to={routes.PATH_RULES}>Rules</Link>*/}
        {/*  </Menu>*/}
        {/*</div>*/}
      </header>
    </>
  );
};

export default Header;
