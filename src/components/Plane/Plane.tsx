import React from 'react';
import styles from './style.module.scss'

function getRandomIntInclusive(min: number = 0, max: number = 11): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Plane = () => {
  const contentData = [
    {text: 'Good Job!', style: {left: '138px', bottom: '100px'}},
    {text: 'Exactly right!', style: {left: '140px', bottom: '120px'}},
    {text: 'Wow! You did it on your own!', style: {left: '148px', bottom: '172px'}},
    {text: 'Marvelous!', style: {left: '139px', bottom: '110px'}},
    {text: 'I knew you could do it!', style: {left: '145px', bottom: '148px'}},
    {text: 'You make it look easy!', style: {left: '145px', bottom: '148px'}},
    {text: 'Nothing can stop you now!', style: {left: '147px', bottom: '163px'}},
    {text: 'DeeVee, will you marry me?', style: {left: '147px', bottom: '163px'}},
    {text: 'Super-Duper!', style: {left: '140px', bottom: '114px'}},
    {text: 'I’ve never seen anyone do it better!', style: {left: '152px', bottom: '194px'}},
    {text: 'One more time and you’ll have it.', style: {left: '150px', bottom: '185px'}},
    {text: 'That’s it! First class work!!', style: {left: '148px', bottom: '168px'}}
  ]

  const number =  getRandomIntInclusive();

  return (
    <div className={styles.planeWrapper}>
      <img src='/assets/images/plane1.svg' alt='Plane' />
      <div className={styles.text} style={contentData[number].style}>{contentData[number].text}</div>
    </div>
  );
};

export default Plane;
