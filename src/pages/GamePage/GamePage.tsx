import React, { useState } from 'react';
import styles from './style.module.scss'
import ObjectWrapperActive, { TObjectWrapper } from '../../components/ObjectWrapperActive/ObjectWrapperActive';
import ObjectWrapperDisabled, { TObjectWrapperDisabled } from '../../components/ObjectWrapperDisabled/ObjectWrapperDisabled';
import Modal from '../../components/Modal/Modal';
import QuestionCard from '../../components/QuestionDialog/QuestionCard';

const GamePage = () => {
  const [isModal, setIsModal] = useState<boolean>(false)

  const objectActiveConfigs: TObjectWrapper[] = [
    {
      key: 1,
      src: '/assets/images/DVC.svg',
      alt: 'AVC',
      left: `calc(50% - 274px/2 + 71px)`,
      top: '111px',
      onClick: () => setIsModal(true)
    },
    {
      key: 2,
      src: '/assets/images/wine.svg',
      alt: 'Wine',
      left: `calc(50% - 174px/2 - 51px)`,
      top: '204px'
    },
    {
      key: 3,
      src: '/assets/images/Gym.svg',
      alt: 'Gym',
      left: '149px',
      top: '293px'
    },
    {
      key: 4,
      src: '/assets/images/school1.svg',
      alt: 'School1',
      left: '287px',
      top: '313px'
    },
    {
      key: 5,
      src: '/assets/images/bank.svg',
      alt: 'Bank',
      left: 'calc(50% - 260px/2 + 2px)',
      top: '408px'
    },
    {
      key: 9,
      src: '/assets/images/Lake.svg',
      alt: 'Lake',
      left: '-106px',
      top: '580px'
    },
    {
      key: 6,
      src: '/assets/images/cinema.svg',
      alt: 'Cinema',
      left: '237px',
      top: '451px'
    },
    {
      key: 7,
      src: '/assets/images/iceCream.svg',
      alt: 'Ice Cream',
      left: '59px',
      top: '576px'
    },
    {
      key: 8,
      src: '/assets/images/ramen.svg',
      alt: 'Ramen',
      left: '194px',
      top: '665px'
    },
    {
      key: 10,
      src: '/assets/images/Garden.svg',
      alt: 'Garden',
      left: '171px',
      top: '894px'
    },
    {
      key: 11,
      src: '/assets/images/Library.svg',
      alt: 'Library',
      left: '255px',
      top: '1253px'
    },
    {
      key: 12,
      src: '/assets/images/school2.svg',
      alt: 'School2',
      left: '93px',
      top: '1180px'
    },
    {
      key: 13,
      src: '/assets/images/Docker.svg',
      alt: 'Docker',
      left: '41px',
      top: '1544px'
    },
    {
      key: 14,
      src: '/assets/images/pizza.svg',
      alt: 'Pizza',
      left: '65.19%',
      right: '-3.97%',
      top: '60.42%',
      bottom: '32.06%'
    },
    {
      key: 15,
      src: '/assets/images/Component1.svg',
      alt: 'Component1',
      left: '191px',
      top: '1020px'
    }
  ];
  const objectDisabledConfigs: TObjectWrapperDisabled[] = [
    {
      key: 16,
      src: '/assets/images/home3.svg',
      alt: 'Home3',
      left: '0px',
      top: '203px'
    },
    {
      key: 17,
      src: '/assets/images/home1.svg',
      alt: 'Home1',
      left: '206px',
      top: '366px'
    },
    {
      key: 18,
      src: '/assets/images/home2.svg',
      alt: 'Home2',
      left: '200px',
      top: '1157px'
    },
    {
      key: 19,
      src: '/assets/images/GroupHome.svg',
      alt: 'Group Home',
      left: '0px',
      top: '950.13px'
    },

  ]
  return (
    <div className={styles.gameLayout}>
      {objectDisabledConfigs.map(item =>
        <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left}/>
      )}
      {objectActiveConfigs.map(item =>
        <ObjectWrapperActive key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} right={item.right} bottom={item.bottom} onClick={item.onClick}/>
      )}
      <Modal show={isModal} setShow={setIsModal}>
        <QuestionCard onClose={setIsModal}/>
      </Modal>
    </div>
  );
};

export default GamePage;
