import React from 'react';
import styles from './style.module.scss'
import RowBody from './RowBody';

const Table = () => {
  const temp = (new Array(15)).fill({ name: 'John Snow', bowls: 15, time: 2520 })
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
        <tr>
          <th><span>Rank</span></th>
          <th>Name</th>
          <th><span>Bowls</span></th>
          <th>Time,<span>sec</span></th>
        </tr>
        </thead>
        <tbody>
        {temp.map(((item, i) =>
            <RowBody key={i} rank={i+1} name={item.name} bowls={item.bowls} time={item.time}/>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
