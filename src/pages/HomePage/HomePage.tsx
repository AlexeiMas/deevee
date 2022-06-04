import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Button from '../../components/Button/Button';
import * as routes from '../../utils/consts';
import Modal from '../../components/Modal/Modal';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import FooterSocials from '../../components/FooterSocials/FooterSocials';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_GAME } from '../../helpers/urlList';

interface IHomePage {
  token: string | null;
  setToken: (token: string) => void;
}

export const HomePage: React.FC<IHomePage> = ({ setToken }: IHomePage) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token)
      navigate(PATH_GAME);
    }
  }, [navigate, searchParams, setToken]);

  const playCallback = () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate(PATH_GAME);
      setToken(token)
    } else {
      setIsModal(true);
    }
  };

  return (
    <MainLayout notContainerMt>
      <div className={styles.logoBlockWrapper}>
        <div className={styles.mainLogoWrapper}>
          <img src='/assets/icons/owlHome.png' alt='Owl' />
          <img className={styles.subLogo} src='/assets/icons/RamenHome.png' alt='RamenLogo1' />
        </div>
        <div className={styles.subMainWrapper}>
          <img src='/assets/icons/RamenHome2.png' alt='RamenLogo2' />
          <h2>DeeVee’s</h2>
          <h3>Ramen Run</h3>
          <h5>by-iterative-ai</h5>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <Button variant={'primary'} onClick={playCallback}>Play</Button>
        <Button variant={'secondary'} sx={{ fontSize: 24 }} href={routes.PATH_RULES}>Rules</Button>
        <Button variant={'secondary'} sx={{ fontSize: 24 }} href={routes.PATH_LEADERBOARD}>Leaderboard</Button>
      </div>
      <Modal show={isModal} setShow={setIsModal}>
        <AuthorizationForm setToken={setToken} />
      </Modal>
      <FooterSocials />
    </MainLayout>
  );
};
