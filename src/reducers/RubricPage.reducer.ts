import { AnyAction } from 'redux';
import { RUBRIC_PAGE_TYPES } from '../actions/rubricPage/RubricPage.types';

export interface ITaskProps {
  contest_id: number;
  nomination_id: number;
  task_id: number;
  scoreNotNull: boolean;
}

export interface ISolution {
  status: string;
  solution: {
    team_id: number;
    task_id: number;
    user_id: number;
    text: string;
    file: null;
    score: null;
    end_at: Date;
    updated_at: Date;
    created_at: Date;
    id: number;
    file_download: null;
  };
  comments: null;
  right_answer: number;
}

export interface ISolutionSponsor {
  team_id: number;
  task_id: number;
  user_id: number;
  score: null;
  id: number;
  file_download: null;
}

export interface IReanswerSolution {
  status: string;
  solution: {
    team_id: number;
    task_id: number;
    user_id: number;
    text: string;
    file: null;
    score: null;
    end_at: Date;
    updated_at: Date;
    created_at: Date;
    id: number;
    file_download: null;
  },
  comments: null;
  is_right: boolean;
}

export interface ITask {
  id: number;
  answer_limit: number;
  answer_limit_period: number;
  default_language: string | null;
  description: string;
  file: null;
  file_structure: null;
  name: string;
  options: string[];
}

export interface ITaskList {
  id: number;
  type: string;
  points: number;
  solutions: ISolutionSponsor[];
}

export interface INomination {
  contest_id: number;
  description: string;
  end_date: string | null;
  id: number;
  name: string;
  start_date: Date;
  tags: any;
  solutions_count: number;
  right_solutions_count: number;
}

export interface IRubricPageState {
  joinContestLoading: boolean;
  joinContestError: string | null;
  getNominationsData: INomination[] | null;
  getNominationsError: string | null;
  getNominationsLoading: boolean;
  getTasksData: ITaskList[] | null;
  getTasksError: string | null;
  getTasksLoading: boolean;
  getTasksSponsorsData: ITaskList[] | null;
  getTasksSponsorsError: string | null;
  getTasksSponsorsLoading: boolean;
  getTaskData: ITask | null;
  getTaskError: string | null;
  getTaskLoading: boolean;
  sendAnswerData: IReanswerSolution | null;
  sendAnswerError: string | null;
  sendAnswerLoading: boolean;
}

export const rubricPageState: IRubricPageState = {
  joinContestLoading: false,
  joinContestError: null,
  getNominationsData: null,
  getNominationsError: null,
  getNominationsLoading: false,
  getTasksData: null,
  getTasksError: null,
  getTasksLoading: false,
  getTasksSponsorsData: null,
  getTasksSponsorsError: null,
  getTasksSponsorsLoading: false,
  getTaskData: null,
  getTaskError: null,
  getTaskLoading: false,
  sendAnswerData: null,
  sendAnswerError: null,
  sendAnswerLoading: false,
};

const rubricPage = (state = rubricPageState, action: AnyAction): IRubricPageState => {
  switch (action.type) {
    case RUBRIC_PAGE_TYPES.JOIN_CONTEST_REQUEST:
      return {
        ...state,
        joinContestLoading: true,
      };
    case RUBRIC_PAGE_TYPES.JOIN_CONTEST_SUCCESS:
      return {
        ...state,
        joinContestLoading: false,
        joinContestError: null,
      };
    case RUBRIC_PAGE_TYPES.JOIN_CONTEST_FAIL:
      return {
        ...state,
        joinContestLoading: false,
        joinContestError: action.error,
      };
    case RUBRIC_PAGE_TYPES.GET_NOMINATIONS_REQUEST:
      return {
        ...state,
        getNominationsLoading: true,
      };
    case RUBRIC_PAGE_TYPES.GET_NOMINATIONS_SUCCESS:
      return {
        ...state,
        getNominationsData: action.payload,
        getNominationsError: null,
        getNominationsLoading: false,
      };
    case RUBRIC_PAGE_TYPES.GET_NOMINATIONS_FAIL:
      return {
        ...state,
        getNominationsError: action.error,
        getNominationsLoading: false,
      };
    case RUBRIC_PAGE_TYPES.GET_TASKS_REQUEST:
      return {
        ...state,
        getTasksLoading: true,
        getTasksData: null,
      };
    case RUBRIC_PAGE_TYPES.GET_TASKS_SUCCESS:
      return {
        ...state,
        getTasksData: action.payload,
        getTasksError: null,
        getTasksLoading: false,
      };
    case RUBRIC_PAGE_TYPES.GET_TASKS_FAIL:
      return {
        ...state,
        getTaskError: action.error,
        getTaskLoading: false,
      };

    case RUBRIC_PAGE_TYPES.GET_TASKS_SPONSORS_REQUEST:
      return {
        ...state,
        getTasksSponsorsLoading: true,
        getTasksSponsorsData: null,
      };
    case RUBRIC_PAGE_TYPES.GET_TASKS_SPONSORS_SUCCESS:
      return {
        ...state,
        getTasksSponsorsData: action.payload,
        getTasksSponsorsError: null,
        getTasksSponsorsLoading: false,
      };
    case RUBRIC_PAGE_TYPES.GET_TASKS_SPONSORS_FAIL:
      return {
        ...state,
        getTasksSponsorsError: action.error,
        getTasksSponsorsLoading: false,
      };

    case RUBRIC_PAGE_TYPES.GET_TASK_REQUEST:
      return {
        ...state,
        getTaskLoading: true,
        getTaskData: null,
      };
    case RUBRIC_PAGE_TYPES.GET_TASK_SUCCESS:
      return {
        ...state,
        getTaskData: action.payload,
        getTaskError: null,
        getTaskLoading: false,
      };
    case RUBRIC_PAGE_TYPES.GET_TASK_FAIL:
      return {
        ...state,
        getTaskError: action.error,
        getTaskLoading: false,
      };


    case RUBRIC_PAGE_TYPES.GET_RANDOM_TASK_REQUEST:
      return {
        ...state,
        getTaskLoading: true,
        getTaskData: null,
      };
    case RUBRIC_PAGE_TYPES.GET_RANDOM_TASK_SUCCESS:
      return {
        ...state,
        getTaskData: action.payload,
        getTaskError: null,
        getTaskLoading: false,
      };
    case RUBRIC_PAGE_TYPES.GET_RANDOM_TASK_FAIL:
      return {
        ...state,
        getTaskError: action.error,
        getTaskLoading: false,
      };

    case RUBRIC_PAGE_TYPES.SEND_ANSWER_REQUEST:
      return {
        ...state,
        sendAnswerLoading: true,
      };
    case RUBRIC_PAGE_TYPES.SEND_ANSWER_SUCCESS:
      return {
        ...state,
        sendAnswerData: action.payload,
        sendAnswerError: null,
        sendAnswerLoading: false,
      };
    case RUBRIC_PAGE_TYPES.SEND_ANSWER_FAIL:
      return {
        ...state,
        sendAnswerData: null,
        sendAnswerError: action.error,
        sendAnswerLoading: false,
      };

    case RUBRIC_PAGE_TYPES.SEND_REANSWER_REQUEST:
      return {
        ...state,
        sendAnswerLoading: true,
      };
    case RUBRIC_PAGE_TYPES.SEND_REANSWER_SUCCESS:
      return {
        ...state,
        sendAnswerData: action.payload,
        sendAnswerError: null,
        sendAnswerLoading: false,
      };
    case RUBRIC_PAGE_TYPES.SEND_REANSWER_FAIL:
      return {
        ...state,
        sendAnswerData: null,
        sendAnswerError: action.error,
        sendAnswerLoading: false,
      };
    default:
      return state;
  }
};

export { rubricPage };
