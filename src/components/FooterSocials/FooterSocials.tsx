import React from 'react';
import styles from './style.module.scss';
import Container from '../Container/Container';
import cn from 'classnames'

const FooterSocials: React.FC<{fixedBottom?: boolean}> = ({fixedBottom = true}) => {
  return (
    <footer className={cn(styles.footer, {[styles.bottomFixed]: fixedBottom})}>
      <Container notMt sx={!fixedBottom ? {width: '100%'} : {}}>
        <a href='/'><img src='/assets/icons/socials/Github.png' alt='Github' /></a>
        <a href='/'><img src='/assets/icons/socials/LinkedIn.png' alt='LinkedIn' /></a>
        <a href='/'><img src='/assets/icons/socials/Discord.png' alt='Discord' /></a>
        <a href='/'><img src='/assets/icons/socials/Twitter.png' alt='Twitter' /></a>
        <a href='/'><img src='/assets/icons/socials/YouTube.png' alt='YouTube' /></a>
        <a href='/'><img src='/assets/icons/socials/logo.png' alt='logo' /></a>
      </Container>
    </footer>
  );
};

export default FooterSocials;
