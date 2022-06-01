import React from 'react';
import styles from './style.module.scss';

export type TRowBody = {
  rank: number,
  name: string,
  score: number,
  time: number
}

const RowBody: React.FC<TRowBody> = ({rank, name, score, time}) => {
  const marks = () => {
    switch (rank) {
      case 1:
        return (<div className={styles.gold} />)
      case 2:
        return (<div className={styles.silver} />)
      case 3:
        return (<div className={styles.bronze} />)
      default:return
    }
  }
  return (
    <tr className={(rank===5) ? styles.active : ''}>
      <td className={styles.rank}>{rank} {marks()}</td>
      <td className={styles.name}>{name}</td>
      <td>{score}</td>
      <td className={styles.time}>{time}</td>
    </tr>
  );
};

export default RowBody;
