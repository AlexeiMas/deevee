import React from 'react';
import styles from './style.module.scss';

export type TQuestionCard = {
  onClose: React.Dispatch<boolean>
}

const QuestionCard = ({onClose}: React.PropsWithChildren<TQuestionCard>) => {
  return (
    <>
      <div className={styles.header}>
        <h3>Who built C-3po</h3>
        <img src='/assets/icons/x.svg' alt='Close' onClick={() => onClose(false)} />
      </div>
      <div className={styles.content}>
        <ul>
          <li className={styles.selected}><span>1</span><span className={styles.item}>R2D2</span></li>
          <li className={styles.right}><span>2</span><span className={styles.item}>Anakin Skywalker</span></li>
          <li className={styles.wrong}><span>3</span><span className={styles.item}>Boba Fett</span></li>
          <li><span>4</span><span className={styles.item}>Jabba</span></li>
        </ul>
      </div>
      <div className={styles.footer}>
        <img src='/assets/icons/logo.svg' alt='Logo' />
        <img src='/assets/icons/owlNeutral.png' alt='Neutral' />
        <img src='/assets/icons/owlExcited.png' alt='Excited' />
      </div>

    </>
  );
};

export default QuestionCard;
