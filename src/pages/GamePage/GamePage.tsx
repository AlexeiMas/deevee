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
import { Helmet } from "react-helmet-async";
import Plane from '../../components/Plane/Plane';
import {ReactComponent as DVC} from '../../assets/images/objects/DVC.svg';
import {ReactComponent as Bank} from '../../assets/images/objects/bank.svg';
import {ReactComponent as Cinema} from '../../assets/images/objects/cinema.svg';
import {ReactComponent as Component1} from '../../assets/images/objects/Component1.svg';
import {ReactComponent as Component3} from '../../assets/images/objects/Component3.svg';
import {ReactComponent as Docker} from '../../assets/images/objects/Docker.svg';
import {ReactComponent as Frame} from '../../assets/images/objects/Frame.svg';
import {ReactComponent as Garden} from '../../assets/images/objects/Garden.svg';
import {ReactComponent as Gym} from '../../assets/images/objects/Gym.svg';
import {ReactComponent as Home1} from '../../assets/images/objects/home1.svg';
import {ReactComponent as Home2} from '../../assets/images/objects/home2.svg';
import {ReactComponent as IceCream} from '../../assets/images/objects/iceCream.svg';
import {ReactComponent as Lake} from '../../assets/images/objects/Lake.svg';
import {ReactComponent as Library} from '../../assets/images/objects/Library.svg';
import {ReactComponent as Pizza} from '../../assets/images/objects/pizza.svg';
import {ReactComponent as Ramen} from '../../assets/images/objects/ramen.svg';
import {ReactComponent as School1} from '../../assets/images/objects/school1.svg';
import {ReactComponent as School2} from '../../assets/images/objects/school2.svg';
import {ReactComponent as Wine} from '../../assets/images/objects/wine.svg';

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
  const [width, setWidth] = useState(window.innerWidth);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [currentNominationId, setCurrentNominationId] = useState<number>();
  const [mustHaveNomination, setMustHaveNomination] = useState<INomination | undefined>();
  const navigate = useNavigate();
  const contest_id = CONTEST_ID ? Number(CONTEST_ID) : -1;
  const [rightAnswer, setRightAnswer] = useState(false);

  const getScore = (nominationsData: INomination[] | null) => {
    return nominationsData ?
      nominationsData.reduce((score, nomination) => score + nomination.right_solutions_count, 0) : 0;
  }


  /* Check answer count for end game */
  useEffect(() => {
    const finishedGame = localStorage.getItem('finished_game');
    if (getNominationsData) {
      const countAnswer = getNominationsData.reduce((count, nomination) => count + nomination.solutions_count, 0);
      if (countAnswer >= NUMBER_OF_QUESTIONS) {   // Check answer count for end game
        !finishedGame && navigate(PATH_BOWLS);
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
    const finishedGame = localStorage.getItem('finished_game');
    const tokenLocal = localStorage.getItem('auth_token');
    if (!token && tokenLocal) {
      setToken(tokenLocal)
    } else {
      if (!token || getContestsError || joinContestError) {
        navigate(PATH_HOME);
      } else {
        !finishedGame && getСontests();
      }
    }
  }, [getСontests, getContestsError, joinContestError, navigate, token]);

  useEffect(() => {
    const finishedGame = localStorage.getItem('finished_game');
    if (getContestsData) {
      const contest = getContestsData.find(contest => contest.id === contest_id);
      if (contest) {
        !finishedGame && getNominations(contest_id);
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
    const finishedGame = localStorage.getItem('finished_game');
    if (mustHaveNomination) {
      !finishedGame && getTasksMustHave(mustHaveNomination.contest_id, mustHaveNomination.id);
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

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions)
  }, []);

  const calcLeft = (x: number): string => (width <= 428) ? `calc(100vw*${x}/428)` : `${x}px`;
  const calcTop = (y: number): string => (width <= 428) ? `calc((100vw*1781/428*${y})/1781)` : `${y}px`;
  const calcWidth = (w: number): string => (width <= 428) ? `calc(100vw*${w}/428)` : `${w}px`;

  const objectActiveConfigs: TObjectWrapper[] = [
    {
      key: 1,
      src: <DVC/>,
      alt: 'DVC',
      left: calcLeft(239),
      top: calcTop(221),
      width: calcWidth(105),
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
      src: <Wine/>,
      alt: 'Wine',

      left: calcLeft(72),
      top: calcTop(200),
      width: calcWidth(174),
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
      src: <Gym/>,
      alt: 'Gym',

      left: calcLeft(149),
      top: calcTop(293),
      width: calcWidth(120),
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
      src: <School1/>,
      alt: 'School1',

      left: calcLeft(287),
      top: calcTop(313),
      width: calcWidth(202),
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
      src: <Lake/>,
      alt: 'Lake',

      left: calcLeft(-110),
      top: calcTop(565),
      width: calcWidth(424),
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
      src: <IceCream/>,
      alt: 'Ice Cream',

      left: calcLeft(59),
      top: calcTop(574),
      width: calcWidth(124),
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
      src: <Ramen/>,
      alt: 'Ramen',

      left: calcLeft(194),
      top: calcTop(665),
      width: calcWidth(142),
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
      src: <Garden/>,
      alt: 'Garden',

      left: calcLeft(188),
      top: calcTop(873),
      width: calcWidth(267),
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
      src: <Library/>,
      alt: 'Library',

      left: calcLeft(255),
      top: calcTop(1253),
      width: calcWidth(210),
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
      src: <Docker/>,
      alt: 'Docker',

      left: calcLeft(41),
      top: calcTop(1544),
      width: calcWidth(255),
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
      src: <Component1/>,
      alt: 'Component1',
      zIndex:2,
      left: calcLeft(191),
      top: calcTop(1020),
      width: calcWidth(124),
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
      src: <Pizza/>,
      alt: 'Pizza',

      left: calcLeft(220),
      top: calcTop(1077),
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
      src: <Home2/>,
      alt: 'Home2',

      left: calcLeft(200),
      top: calcTop(1157),
      width: calcWidth(129)
    },
    // {
    //   key: 19,
    //   src: <DVC/>,
    //   alt: 'Group Home',
    //
    //   left: calcLeft0),
    //   top: calcTop56),
    //   zIndex: 1
    // },
  ]

  const otherActiveConfigs: TObjectWrapper[] = [
    {
      key: 16,
      src: <Component3/>,
      alt: 'Component3',

      left: calcLeft(-78),
      top: calcTop(947),
      width: calcWidth(202),
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
      src: <Bank/>,
      alt: 'Bank',

      left: calcLeft(80),
      top: calcTop(404),
      width: calcWidth(261),
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
      src: <Cinema/>,
      alt: 'Cinema',

      left: calcLeft(237),
      top: calcTop(451),
      width: calcWidth(196),
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
      src: <School2/>,
      alt: 'School2',

      left: calcLeft(93),
      top: calcTop(1180),
      width: calcWidth(202),
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
      src: <Frame/>,
      alt: 'Frame',

      left: calcLeft(325),
      top: calcTop(565),
      width: calcWidth(104),
      zIndex: 1
    },
    {
      key: 17,
      src: <Home1/>,
      alt: 'Home1',

      left: calcLeft(206),
      top: calcTop(366),
      width: calcWidth(149)
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
          return <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} width={item.width}/>
        } else {
          return <ObjectWrapperActive key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} right={item.right} bottom={item.bottom} onClick={item.onClick} zIndex={item.zIndex} width={item.width} />
        }
      } else if (getNominationsData && item.nomination_id) {
        if (isActiveRandom(item.nomination_id, getNominationsData)) {
          return <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} width={item.width}/>
        } else {
          return <ObjectWrapperActive key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} right={item.right} bottom={item.bottom} onClick={item.onClick} zIndex={item.zIndex} width={item.width} />
        }
      } else return <ObjectWrapperActive key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} width={item.width} />
    })
  }

  useEffect(() => {
    if (rightAnswer && !isModal) {
      setTimeout(() => setRightAnswer(false), 10000);
    }
  }, [isModal, rightAnswer])


  return (
    <>
      <Helmet>
        <title>Game - Dee Vee's Ramen Run</title>
      </Helmet>
      <div className={styles.gameLayout}>
        <div className={styles.background}>
          <Header rightCount={getScore(getNominationsData)} />
          {objectDisabledConfigs.map(item =>
            <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} width={item.width}/>
          )}
          {
            getDynamicBuilds(objectActiveConfigs, getTasksMustHaveData, getNominationsData)
          }
          {otherDisabledConfigs.map(item =>
            <ObjectWrapperDisabled key={item.key} src={item.src} alt={item.alt} top={item.top} left={item.left} bottom={item.bottom} zIndex={item.zIndex} width={item.width}/>
          )}
          {
            getDynamicBuilds(otherActiveConfigs, getTasksMustHaveData, getNominationsData)
          }
          {rightAnswer && !isModal && <Plane/>}
          <Modal show={isModal} setShow={setIsModal}>
            <QuestionCard nomination_id={currentNominationId} onClose={setIsModal} isRightAnswer={rightAnswer} setIsRightAnswer={setRightAnswer} />
          </Modal>
        </div>
      </div>
    </>
  );
};

const Game = React.memo(GamePage);
