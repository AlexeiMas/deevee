import React from 'react';
import styles from './style.module.scss';

export type TRowBody = {
  id: number | undefined,
  rank: number | null,
  name: string,
  bowls: number,
  time: number
}

const RowBody: React.FC<TRowBody> = ({id, rank, name, bowls, time}) => {
  const marks = () => {
    switch (rank) {
      case 1:
        return (<img src={'/assets/icons/awards/gold.png'} alt={'Gold'} className={styles.gold} />)
      case 2:
        return (<img src={'/assets/icons/awards/silver.png'} alt={'Silver'} className={styles.silver} />)
      case 3:
        return (<img src={'/assets/icons/awards/bronze.png'} alt={'Bronze'} className={styles.bronze} />)
      default:return
    }
  }

  return (
    <tr className={id ? styles.active : ''}>
      <td className={styles.rank}><span>{rank}</span>{marks()}</td>
      <td className={styles.name}>{name}</td>
      <td className={styles.bowls}>{bowls}</td>
      <td className={styles.time}>{time}</td>
    </tr>
  );
};

export default RowBody;
