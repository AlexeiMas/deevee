import React from 'react';
import styles from './style.module.scss';
import Container from '../Container/Container';
import cn from 'classnames'

const FooterSocials: React.FC<{fixedBottom?: boolean}> = ({fixedBottom = true}) => {
  return (
    <footer className={cn(styles.footer, {[styles.bottomFixed]: fixedBottom})}>
      <Container notMt sx={!fixedBottom ? {width: '100%'} : {}}>
        <a href='https://github.com/iterative'><img src='/assets/icons/socials/Github.svg' alt='Github' /></a>
        <a href='https://www.linkedin.com/company/iterative-ai'><img src='/assets/icons/socials/LinkedIn.svg' alt='LinkedIn' /></a>
        <a href='https://discord.com/invite/dvwXA2N'><img src='/assets/icons/socials/Discord.svg' alt='Discord' /></a>
        <a href='https://twitter.com/DVCorg'><img src='/assets/icons/socials/Twitter.svg' alt='Twitter' /></a>
        <a href='https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ'><img src='/assets/icons/socials/YouTube.svg' alt='YouTube' /></a>
        <a href='https://iterative.ai'><img src='/assets/icons/socials/logo.svg' alt='logo' /></a>
      </Container>
    </footer>
  );
};

export default FooterSocials;
