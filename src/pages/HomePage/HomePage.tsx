import React, { useEffect, useState } from 'react';
import { LoginModal } from '../../components/LoginModal/LoginModal';
import styles from './style.module.scss';
import Button from '../../components/Button/Button';
import * as routes from '../../utils/consts';
import Modal from '../../components/Modal/Modal';
import { Helmet } from "react-helmet-async";
// import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import FooterSocials from '../../components/FooterSocials/FooterSocials';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_GAME } from '../../helpers/urlList';
import { PATH_RULES } from '../../utils/consts';

interface IHomePage {
  token: string | null;
  setToken: (token: string) => void;
}

export const HomePage: React.FC<IHomePage> = ({ setToken, token }: IHomePage) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenSearch = searchParams.get("token");
    if (tokenSearch) {
      const readRules = localStorage.getItem('read_rules');
      if (!readRules) {
        localStorage.setItem('read_rules', 'false');
      }
      setToken(tokenSearch);
      (readRules === 'true') ? navigate(PATH_GAME) : navigate(PATH_RULES);
    }
  }, [navigate, searchParams, setToken]);

  const playCallback = () => {
    const tokenLocal = localStorage.getItem("auth_token");
    if (token) {
      navigate(PATH_GAME);
      !tokenLocal && setToken(token);
    } else {
      setIsModal(true);
    }
  };

  return (
    <MainLayout notContainerMt>
      <Helmet>
        <title>Home - Dee Vee's Ramen Run</title>
        <meta property="og:title" content="Dee Vee's Ramen Run" />
        <meta property="og:description" content="Your mission is to go around the DeeVee city to answer as many questions as you can to rocket to the top of the leader board!" />
        {/*<meta property="og:image" content={`${APP_URL}${SocialImage}`} />*/}
      </Helmet>
      <div className={styles.logoBlockWrapper}>
        <div className={styles.mainLogoWrapper}>
          <img src='/assets/icons/owlHome.png' alt='Owl' />
          <img className={styles.subLogo} src='/assets/icons/RamenHome.png' alt='RamenLogo1' />
        </div>
        <div className={styles.subMainWrapper}>
          <img src='/assets/icons/RamenHome2.png' alt='RamenLogo2' />
          <h2>DeeVee’s</h2>
          <h3>Ramen Run</h3>
          <h5>by iterative.ai</h5>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <Button variant={'primary'} onClick={playCallback}>Play</Button>
        <Button variant={'secondary'} sx={{ fontSize: 24 }} href={routes.PATH_RULES}>Rules</Button>
        <Button variant={'secondary'} sx={{ fontSize: 24 }} href={routes.PATH_LEADERBOARD}>Leaderboard</Button>
      </div>
      <Modal show={isModal} setShow={setIsModal} overlayClick={true}>
        <LoginModal state='sign-up' />
        {/*<AuthorizationForm setToken={setToken} />*/}
      </Modal>
      <FooterSocials />
    </MainLayout>
  );
};
