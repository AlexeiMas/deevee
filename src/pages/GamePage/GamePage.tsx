import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss'
import ObjectWrapperActive, { TObjectWrapper } from '../../components/ObjectWrapperActive/ObjectWrapperActive';
import ObjectWrapperDisabled, { TObjectWrapperDisabled } from '../../components/ObjectWrapperDisabled/ObjectWrapperDisabled';
import Modal from '../../components/Modal/Modal';
import QuestionCard from '../../components/QuestionDialog';
import Header from '../../components/Header/Header';
import { IContest } from "../../reducers/User.reducer";
import { setToken } from '../../actions/user/User.actions';
import { PATH_HOME, PATH_BOWLS, PATH_FORM } from '../../utils/consts';
import { INomination, ITask, ITaskList } from "../../reducers/GamePage.reducer";
import { IFormInfoData } from '../../reducers/FormPage.reducer';

const CONTEST_ID = process.env.REACT_APP_CONTEST_ID;
const NUMBER_OF_QUESTIONS = 16;
const MUST_HAVE_NOMINATION_ID = 43;
const MUST_RANDOM0_NOMINATION_ID = 44;
const MUST_RANDOM1_NOMINATION_ID = 45;
const MUST_RANDOM2_NOMINATION_ID = 46;
const MUST_RANDOM3_NOMINATION_ID = 47;

interface IGamePage {
  token: string | null;
  getСontests: () => void;
  getContestsError: string | null;
  getContestsData: IContest[] | null;
  joinСontest: (contest_id: number, onSuccess?: () => void) => any;
  joinContestError: string | null;
  getNominations: (contest_id: number) => any;
  getNominationsData: INomination[] | null,
  getNominationsError: string | null,
  getTasksMustHave: (contest_id: number, nomination_id: number) => any;
  getTask: (contest_id: number, nomination_id: number, task_id: number, onSuccess?: () => void) => any;
  getRandomTask: (contest_id: number, nomination_id: number, onSuccess?: (task: ITask) => void) => any;
  setFormState: (state: boolean) => void;
  formState: boolean;
  getTasksMustHaveData: ITaskList[] | null;
  getForm: (onSuccess: (data: IFormInfoData) => void) => void;
}

export const GamePage: React.FC<IGamePage> = ({
  token,
  getСontests,
  getContestsError,
  getContestsData,
  joinСontest,
  joinContestError,
  getNominations,
  getNominationsData,
  getNominationsError,
  getTasksMustHave,
  getTask,
  getRandomTask,
  getTasksMustHaveData,
  setFormState,
  getForm,
  formState,
}: IGamePage) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [currentNominationId, setCurrentNominationId] = useState<number>();
  const [mustHaveNomination, setMustHaveNomination] = useState<INomination | undefined>();
  const navigate = useNavigate();
  const contest_id = CONTEST_ID ? Number(CONTEST_ID) : -1;

  const getScore = (nominationsData: INomination[] | null) => {
    return nominationsData ?
      nominationsData.reduce((score, nomination) => score + nomination.right_solutions_count, 0) : 0;
  }


  /* Check answer count for end game */
  useEffect(() => {
    if (getNominationsData) {
      const countAnswer = getNominationsData.reduce((count, nomination) => count + nomination.solutions_count, 0);
      if (countAnswer >= NUMBER_OF_QUESTIONS) {   // Check answer count for end game
        //TODO fix redirect
        // navigate(PATH_BOWLS);
      } else { //Check right answer count for redirect to form
        if (getScore(getNominationsData) === 2 && formState) {
          getForm((data) => {
            setFormState(false);
            if (!data.is_completed) {
              navigate(PATH_FORM);
            }
          })
        }
      }
    }
  }, [getNominationsData]);

  useEffect(() => {
    if (!token || getContestsError || joinContestError) {
      navigate(PATH_HOME);
    } else {
      getСontests();
    }
  }, [getСontests, getContestsError, joinContestError, navigate, token]);

  useEffect(() => {
    if (getContestsData) {
      const contest = getContestsData.find(contest => contest.id === contest_id);
      if (contest) {
        getNominations(contest_id);
      } else {
        joinСontest(contest_id, () => getСontests());
      }
    }
  }, [contest_id, getContestsData, getNominations, getСontests, joinСontest]);

  useEffect(() => {
    if (getNominationsData) {
      setMustHaveNomination(getNominationsData.find(nomination => nomination.name === 'Must have'));
    }
  }, [getNominationsData]);

  useEffect(() => {
    if (mustHaveNomination) {
      getTasksMustHave(mustHaveNomination.contest_id, mustHaveNomination.id);
    }
  }, [getTasksMustHave, mustHaveNomination]);


  // id:184 - What does TPI stand for?
  // id:187 - What is CML used for?
  // id:190 - Which of the following are a Feature of DVC?
  // id:191 - Which of the following is possible with DVC?
  // id:195 - What is the correct file to create a Docker image?
  // id:201 - Why is Ramen so important to Iterative?
  // id:203 - !!!What is the DeeVee back story?
  // id:205 - What is the best way to learn about Iterative Tools?
  // id:207 - How do you pronounce MLEM?
  // id:208 - What does MLEM help with?
  // id:210 - What can you build with GTO?
  // id:213 - ___ are a special kind of plots generated by Studio to show how your metrics have been changing over the course of your ML experimentation.

  const objectActiveConfigs: TObjectWrapper[] = [
    {
      key: 1,
      src: '/assets/images/DVC.svg',
      alt: 'DVC',
      left: 'calc(50% - 102px/2 + 78px)',
      top: '222px',
      task_id: 208,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 208, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 2,
      src: '/assets/images/wine.svg',
      alt: 'Wine',

      left: `calc(50% - 174px/2 - 34px)`,
      top: '200px',
      task_id: 210,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 210, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 3,
      src: '/assets/images/Gym.svg',
      alt: 'Gym',

      left: '149px',
      top: '293px',
      task_id: 184,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 184, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 4,
      src: '/assets/images/school1.svg',
      alt: 'School1',

      left: '287px',
      top: '313px',
      task_id: 205,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 205, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 9,
      src: '/assets/images/Lake.svg',
      alt: 'Lake',

      left: '-106px',
      top: '580px',
      nomination_id: MUST_RANDOM0_NOMINATION_ID,
      onClick: () => {
        getRandomTask(contest_id, MUST_RANDOM0_NOMINATION_ID, (task) => {
          setCurrentNominationId(MUST_RANDOM0_NOMINATION_ID);
          setIsModal(true)
        })
      }
    },
    {
      key: 7,
      src: '/assets/images/iceCream.svg',
      alt: 'Ice Cream',

      left: '59px',
      top: '574px',
      task_id: 203,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 203, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 8,
      src: '/assets/images/ramen.svg',
      alt: 'Ramen',

      left: '194px',
      top: '666px',
      task_id: 201,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 201, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 10,
      src: '/assets/images/Garden.svg',
      alt: 'Garden',

      left: '171px',
      top: '894px',
      nomination_id: MUST_RANDOM1_NOMINATION_ID,
      onClick: () => {
        getRandomTask(contest_id, MUST_RANDOM1_NOMINATION_ID, (task) => {
          setCurrentNominationId(MUST_RANDOM1_NOMINATION_ID);
          setIsModal(true)
        })
      }
    },
    {
      key: 11,
      src: '/assets/images/Library.svg',
      alt: 'Library',

      left: '255px',
      top: '1253px',
      task_id: 191,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 191, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 13,
      src: '/assets/images/Docker.svg',
      alt: 'Docker',

      left: '41px',
      top: '1544px',
      task_id: 195,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 195, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 15,
      src: '/assets/images/Component1.svg',
      alt: 'Component1',
      zIndex:2,
      left: '191px',
      top: '1020px',
      task_id: 207,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 207, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 14,
      src: '/assets/images/pizza.svg',
      alt: 'Pizza',

      left: '72%',
      right: '-3.97%',
      top: '60.45%',
      bottom: '32.06%',
      task_id: 190,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 190, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
  ]

  const objectDisabledConfigs: TObjectWrapperDisabled[] = [
    {
      key: 18,
      src: '/assets/images/home2.svg',
      alt: 'Home2',

      left: '200px',
      top: '1157px'
    },
    {
      key: 19,
      src: '/assets/images/GroupHome.svg',
      alt: 'Group Home',

      left: '30px',
      top: '956px',
      zIndex: 1
    },
  ]

  const otherActiveConfigs: TObjectWrapper[] = [
    {
      key: 16,
      src: '/assets/images/Component3.svg',
      alt: 'Component3',

      left: '-78px',
      top: '947px',
      zIndex: 1,
      task_id: 187,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 187, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    },
    {
      key: 5,
      src: '/assets/images/bank.svg',
      alt: 'Bank',

      left: 'calc(50% - 260px/2 + 24px)',
      top: '404px',
      nomination_id: MUST_RANDOM2_NOMINATION_ID,
      onClick: () => {
        getRandomTask(contest_id, MUST_RANDOM2_NOMINATION_ID, (task) => {
          setCurrentNominationId(MUST_RANDOM2_NOMINATION_ID);
          setIsModal(true)
        })
      }
    },
    {
      key: 6,
      src: '/assets/images/cinema.svg',
      alt: 'Cinema',

      left: '237px',
      top: '451px',
      nomination_id: MUST_RANDOM3_NOMINATION_ID,
      onClick: () => {
        getRandomTask(contest_id, MUST_RANDOM3_NOMINATION_ID, (task) => {
          setCurrentNominationId(MUST_RANDOM3_NOMINATION_ID);
          setIsModal(true)
        })
      }
    },
    {
      key: 12,
      src: '/assets/images/school2.svg',
      alt: 'School2',

      left: '93px',
      top: '1180px',
      task_id: 213,
      onClick: () => {
        getTask(contest_id, MUST_HAVE_NOMINATION_ID, 213, () => {
          setCurrentNominationId(43);
          setIsModal(true)
        })
      }
    }
  ]


  const otherDisabledConfigs: TObjectWrapperDisabled[] = [
    {
      key: 21,
      src: '/assets/images/Frame.svg',
      alt: 'Frame',

      left: '324px',
      top: '569px',
      zIndex: 1
    },
    {
      key: 17,
      src: '/assets/images/home1.svg',
      alt: 'Home1',

      left: '206px',
      top: '366px'
    },
    {
      key: 20,
      src: '/assets/images/plane1.svg',
      alt: 'Plane',
      zIndex:3
    },
  ]

  const isActiveMustHave = (task_id: number, tasksData: ITaskList[]) => {
    const task = tasksData.find(task => task.id === task_id);
    if (task && task.solutions.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const isActiveRandom = (nomination_id: number, nominationsData: INomination[]) => {
    const nomination = nominationsData.find(nomination => nomination.id === nomination_id);
    if (nomination && nomination.solutions_count > 0) {
      return true;
    } else {
      return false;
    }
  }

  const getDynamicBuilds = (
    objectConfigs: TObjectWrapper[],
    getTasksMustHaveData: ITaskList[] | null,
    getNominationsData: INomination[] | null
  ) => {
    return objectConfigs.map(item => {
      if (getTasksMustHaveData && item.task_id) {
        if (isActiveMustHave(item.task_id, getTasksMustHaveData)) {
          return <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} />
        } else {
          return <ObjectWrapperActive key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} right={item.right} bottom={item.bottom} onClick={item.onClick} zIndex={item.zIndex} />
        }
      } else if (getNominationsData && item.nomination_id) {
        if (isActiveRandom(item.nomination_id, getNominationsData)) {
          return <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} />
        } else {
          return <ObjectWrapperActive key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} right={item.right} bottom={item.bottom} onClick={item.onClick} zIndex={item.zIndex} />
        }
      } else return <ObjectWrapperActive key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} />
    })
  }


  return (
    <>
      <div className={styles.gameLayout}>
        <div className={styles.background}>
          <Header rightCount={getScore(getNominationsData)} />
          {objectDisabledConfigs.map(item =>
            <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} />
          )}
          {
            getDynamicBuilds(objectActiveConfigs, getTasksMustHaveData, getNominationsData)
          }
          {otherDisabledConfigs.map(item =>
            <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} />
          )}
          {
            getDynamicBuilds(otherActiveConfigs, getTasksMustHaveData, getNominationsData)
          }
          <Modal show={isModal} setShow={setIsModal}>
            <QuestionCard nomination_id={currentNominationId} onClose={setIsModal} />
          </Modal>
        </div>
      </div>
    </>
  );
};
