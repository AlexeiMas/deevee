import React from 'react';
import styles from './style.module.scss';
import Container from '../../components/Container/Container';
import ClosePageHeader from '../../components/ClosePageHeader/ClosePageHeader';

export type TMainLayout = {
    notContainerMt?: boolean,
    headerBtnTo?: string,
    areRamens?: boolean,
    verticalAlign?: 'flex-start' | 'flex-end' | 'center',
    sx?: React.CSSProperties | false,
    close?: () => void
    wide?: boolean
}

const MainLayout = ({
                        notContainerMt,
                        headerBtnTo,
                        areRamens = true,
                        verticalAlign = 'center',
                        sx,
                        children,
                        close,
                        wide = false,
                    }: React.PropsWithChildren<TMainLayout>) => {
    const spreadSX = sx ? {alignItems: verticalAlign, ...sx} : {alignItems: verticalAlign};

    return (
        <div className={`${styles.mainWrapper} ${wide ? styles.isWide : ''}`} style={spreadSX}>
            <Container notMt={notContainerMt || !headerBtnTo} wide={wide}>
                {
                    areRamens &&
                    <>
                        <img src='/assets/icons/Ramen1.png' alt='Ramen1' className={styles.ramen1}/>
                        <img src='/assets/icons/Ramen2.png' alt='Ramen2' className={styles.ramen2}/>
                        <img src='/assets/icons/Ramen3.png' alt='Ramen3' className={styles.ramen3}/>
                        <img src='/assets/icons/Ramen4.png' alt='Ramen4' className={styles.ramen4}/>
                    </>
                }
                {children}
            </Container>
            {headerBtnTo && <ClosePageHeader backTo={headerBtnTo} close={close}/>}
        </div>
    );
};

export default MainLayout;
