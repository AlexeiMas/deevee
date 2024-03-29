import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './style.module.scss'
import { PATH_GAME } from '../../utils/consts';
import Placeholder from '../../components/Placeholder/Placeholder';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ISolution } from 'src/reducers/GamePage.reducer';

const CONTEST_ID = process.env.REACT_APP_CONTEST_ID;
const FOR_2_BOWLS_NOMINATION_ID = 49;
const FOR_2_BOWLS_TASK_ID = 217;

interface IFormPage {
  representation?: string;
  sendAnswer: (
    contest_id: number, nomination_id: number, task_id: number, answer: number,
    onSuccess?: (data: ISolution) => void) => any;
  sendForm: (
    formData: { answers: { question_id: number, value: string | number }[] },
    onSuccess: () => void) => void;
}

export const FormPage: React.FC<IFormPage> = ({
  representation = 'PAGE',
  sendForm,
  sendAnswer,
}: IFormPage) => {
  const contest_id = CONTEST_ID ? Number(CONTEST_ID) : -1;
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [based, setBased] = useState('');
  const [size, setSize] = useState('');

  const onHandleForm = (e: React.FormEvent) => {
    e.preventDefault();
    sendForm({
      answers: [{
        question_id: 23,
        value: title,
      }, {
        question_id: 24,
        value: company,
      }, {
        question_id: 25,
        value: based,
      }, {
        question_id: 26,
        value: size,
      }]
    }, () => {
      sendAnswer(contest_id, FOR_2_BOWLS_NOMINATION_ID, FOR_2_BOWLS_TASK_ID, 0, () => {
        navigate(PATH_GAME);
      })
    })
  };

  return (
    <MainLayout verticalAlign={"flex-start"} headerBtnTo={PATH_GAME} sx={representation === 'DIALOG' ? { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 } : false}>
      <div className={styles.pageWrapper}>
        <h1>Fill in<br />the form to receive 2 extra bowls!</h1>
        <form onSubmit={onHandleForm}>
          <Placeholder name={'title'} placeholder={'Chief Owl'} type={'text'} required={true} value={title} onChange={(e) => setTitle(e.target.value)} label={'What is your title?'} />
          <Placeholder name={'company'} placeholder={'Iterative'} type={'text'} required={true} value={company} onChange={(e) => setCompany(e.target.value)} label={'What company do you work for?'} />
          <Placeholder name={'based'} placeholder={'SF, USA'} type={'text'} required={true} value={based} onChange={(e) => setBased(e.target.value)} label={'Where are you based?'} />
          <Placeholder name={'size'} placeholder={'35'} type={'number'} required={true} value={size} onChange={(e) => setSize(e.target.value)} label={'What is the size of your ML Team?'} />
          <Button variant={'secondary'} sx={{ fontSize: '24px', marginTop: '2rem' }}>Save</Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default FormPage;
