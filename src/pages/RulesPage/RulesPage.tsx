import React from 'react';
import styles from './style.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { PATH_GAME, PATH_HOME } from '../../utils/consts';
import Button from '../../components/Button/Button';

const RulesPage = () => {
  return (
    <MainLayout headerBtnTo={PATH_HOME} verticalAlign={"flex-start"}>
      <div className={styles.pageWrapper}>
        <h1>Rules</h1>
        <div className={styles.description}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore enim error excepturi fugiat veritatis. Accusamus aspernatur impedit labore modi necessitatibus nesciunt non possimus sunt voluptatem?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque ea eos necessitatibus nisi provident qui quis. Dolore eaque iste vel! Architecto ipsum laboriosam nihil quaerat?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur dolores eius eveniet facere in molestias omnis praesentium quas voluptate. Aliquid cumque impedit nesciunt rem.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi commodi cum, debitis id magni non nulla omnis optio placeat quas rerum sint, vel voluptates?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur, at consequatur culpa ducimus facilis incidunt ipsa nihil, odio odit praesentium quibusdam ratione tempore veritatis.</p>
        </div>
        <Button variant={"primary"} sx={{fontSize: '24px'}} href={PATH_GAME}>Next</Button>
      </div>
    </MainLayout>
  );
};

export default RulesPage;
