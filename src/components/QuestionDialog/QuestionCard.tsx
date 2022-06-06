import React, { useState } from 'react';
import styles from './style.module.scss';
import { INomination, ISolution, ITask } from '../../reducers/GamePage.reducer';

const CONTEST_ID = process.env.REACT_APP_CONTEST_ID;

export interface IQuestionCard {
  sendAnswer: (contest_id: number, nomination_id: number, task_id: number, answer: number, onSuccess?: (data: ISolution) => void) => any;
  getNominations: (contest_id: number) => any;
  currentTask: ITask | null;
  sendAnswerLoading: boolean;
  sendAnswerData: ISolution | null;
  nomination_id: number | undefined;
  onClose: React.Dispatch<boolean>;
  isRightAnswer: boolean,
  setIsRightAnswer: React.Dispatch<boolean>
}

const QuestionCard: React.FC<IQuestionCard> = ({
  sendAnswer,
  getNominations,
  currentTask,
  sendAnswerData,
  sendAnswerLoading,
  nomination_id,
  onClose,
  isRightAnswer,
  setIsRightAnswer
}: IQuestionCard) => {

  const [selected, setSelected] = useState<number>()
  const [disabled, setDisabled] = useState<boolean>(false);
  const contest_id = CONTEST_ID ? Number(CONTEST_ID) : -1;

  const getFromString = (html: string) => {
    return (
      <div className="content" dangerouslySetInnerHTML={{ __html: html }}></div>
    );
  }

  const handleAnswer = (answer: number, contest_id: number, nomination_id: number, task_id: number) => {
    if (!disabled) {
      setSelected(answer);
      sendAnswer(contest_id, nomination_id, task_id, answer, (data) => {
        setIsRightAnswer(answer === data.right_answer);
        setDisabled(true);
      });
    }
  }

  const getOwl = () => {
    if (sendAnswerData && !sendAnswerLoading) {
      if (selected !== undefined && sendAnswerData.right_answer === selected) {
        return <img src='/assets/icons/owlHappy.png' alt='Happy' />
      }
      else if (selected !== undefined && sendAnswerData.right_answer !== selected) {
        return <img src='/assets/icons/owlExcited.png' alt='Excited' />
      }
    }
    return <img src='/assets/icons/owlNeutral.png' alt='Neutral' />;
  }

  return currentTask && nomination_id ? <>
    <div className={styles.header}>
      <h3>{getFromString(currentTask.description)}</h3>
      <img src='/assets/icons/x.svg' alt='Close' onClick={() => {
        if (selected !== undefined) getNominations(contest_id);
        onClose(false);
      }} />
    </div>
    <div className={styles.content}>
      <ul>
        {currentTask.options.map((option, index) => {
          if (sendAnswerData && !sendAnswerLoading && sendAnswerData.solution.task_id === currentTask.id) {
            if (selected !== undefined && sendAnswerData.right_answer === index) {
              return (
                <li key={index} className={styles.right}><span>{index + 1}</span><span className={styles.item}>{option}</span></li>
              )
            } else if (selected !== undefined && sendAnswerData.right_answer !== index && index === selected) {
              return (
                <li className={styles.wrong} key={index}><span>{index + 1}</span><span className={styles.item}>{option}</span></li>
              )
            }
          }

          if (selected !== undefined && selected === index && sendAnswerLoading) {
            return (
              <li className={styles.selected}><span>{index + 1}</span><span className={styles.item}>{option}</span></li>
            )
          } else {
            return (
              <li
                onClick={() => handleAnswer(index, contest_id, nomination_id, currentTask.id)}>
                <span>{index + 1}</span>
                <span className={styles.item}>{option}</span>
              </li>
            )
          }
        })}
      </ul>
    </div>
    <div className={styles.footer}>
      {getOwl()}
    </div>
  </> : <></>;
};

export default QuestionCard;
