import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './style.module.scss'
import { PATH_GAME } from '../../utils/consts';
import Placeholder from '../../components/Placeholder/Placeholder';
import Button from '../../components/Button/Button';

export const FormPage: React.FC<{representation?: 'PAGE' | 'DIALOG'}> = ({representation = 'DIALOG'}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [based, setBased] = useState('');
  const [size, setSize] = useState('');

  console.log(title, company, based, size);
  return (
    <MainLayout verticalAlign={"flex-start"} headerBtnTo={PATH_GAME} sx={representation === 'DIALOG' ? {position: 'fixed', top: 0, right: 0, bottom: 0, left: 0} : false}>
      <div className={styles.pageWrapper}>
        <h1>Fill<br/>in the form and 2 extra bowls!</h1>
        <form>
          <Placeholder name={'title'} placeholder={'Chief Owl'} type={'text'} required={true} value={title} onChange={(e) => setTitle(e.target.value)} label={'What is your title?'}/>
          <Placeholder name={'company'} placeholder={'Iterative'} type={'text'} required={true} value={company} onChange={(e) => setCompany(e.target.value)} label={'What company do you work for?'}/>
          <Placeholder name={'based'} placeholder={'SF, USA'} type={'text'} required={true} value={based} onChange={(e) => setBased(e.target.value)} label={'Where are you based?'}/>
          <Placeholder name={'size'} placeholder={'35'} type={'number'} required={true} value={size} onChange={(e) => setSize(e.target.value)} label={'What is the size of your ML Team?'}/>
          <Button variant={'secondary'} sx={{fontSize: '24px', marginTop: '2rem'}}>Save</Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default FormPage;
