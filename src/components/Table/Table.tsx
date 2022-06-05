import React from 'react';
import styles from './style.module.scss'
import RowBody from './RowBody';
import { ILeaderboardItem } from '../../reducers/LeaderboardPage.reducer';

interface TableProps {
  items: ILeaderboardItem[];
}

const Table: React.FC<TableProps> = ({ items }: TableProps) => {
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
          {items.map(((item, i) =>
            <RowBody key={i} id={item.id} rank={item.place} name={item.name} bowls={item.score} time={Number(item.time)} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
