import React, {useEffect, useState} from 'react';
import styles from './style.module.scss'
import RowBody from './RowBody';
import {ILeaderboardItem} from '../../reducers/LeaderboardPage.reducer';
import {getUserData} from '../../api/userAPI';
import cn from 'classnames'

interface TableProps {
    items: ILeaderboardItem[];
    wide?: boolean
}

const Table: React.FC<TableProps> = ({items, wide = false}: TableProps) => {
    const [teamId, setTeamId] = useState<number | undefined>(undefined)

    useEffect(() => {
        const auth_token = localStorage.getItem("auth_token");
        auth_token && getUserData().then(res => (res.data.status === 'success') && setTeamId(Number(res.data.team.id)))
    }, [])

    return (
        <div className={cn(styles.tableWrapper, {[styles.isWide]: wide})}>
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
                        <RowBody key={i} id={(Number(item.team_id) === teamId) ? teamId : undefined} rank={item.place}
                                 name={item.name} bowls={item.score} time={Number(item.time)}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
