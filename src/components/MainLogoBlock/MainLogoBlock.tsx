import React from 'react';
import styles from './style.module.scss';
import cn from 'classnames'

export type TMainLogoBlock = {
  size?: "default" | "large",
  sx?: React.CSSProperties
}

const MainLogoBlock: React.FC<TMainLogoBlock> = ({size = 'default', sx}) => {
  return (
    <div className={cn(styles.logoBlockWrapper, {[styles.logoBlockWrapperLg]: (size === 'large')})} style={sx}>
      <div className={cn(styles.mainLogoWrapper, {[styles.mainLogoWrapperLg]: (size === 'large')})}>
        <img src={size === 'default' ? '/assets/icons/owlHome.png' : '/assets/icons/owlLeaderboard.png'} alt='Owl' />
        <img className={cn(styles.subLogo, {[styles.subLogoLg]: (size === 'large')})} src={size === 'default' ? '/assets/icons/RamenHome.png' : '/assets/icons/RamenLeaderboard.png'} alt='RamenLogo1' />
      </div>
      <div className={cn(styles.subMainWrapper, {[styles.subMainWrapperLg]: (size === 'large')})}>
        {(size === 'default') && <img src='/assets/icons/RamenHome2.png' alt='RamenLogo2' />}
        <h2>DeeVee’s</h2>
        <h3>Ramen Run</h3>
        <h5>by iterative.ai</h5>
      </div>
    </div>
  );
};

export default MainLogoBlock;
