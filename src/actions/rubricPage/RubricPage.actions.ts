import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RUBRIC_PAGE_TYPES } from './RubricPage.types';
import clientApi from '../../helpers/clientApi';
import { IReanswerSolution } from '../../reducers/RubricPage.reducer';

export const joinСontest = (contest_id: number, onSuccess?: () => void,): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.JOIN_CONTEST_REQUEST,
      });
      const response: any = await clientApi.post(`contests/${contest_id}/join`);
      dispatch({
        type: RUBRIC_PAGE_TYPES.JOIN_CONTEST_SUCCESS,
        payload: response.data,
      });

      if (onSuccess) onSuccess();
      return response.data;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.JOIN_CONTEST_FAIL,
        error: 'Something went wrong',
      });
    }
  };


export const getNominations = (contest_id: number): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_NOMINATIONS_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${contest_id}/nominations`);
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_NOMINATIONS_SUCCESS,
        payload: response.data.nominations,
      });

      return response.data.nominations;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_NOMINATIONS_FAIL,
        error: 'Something went wrong',
      });
    }
  };

export const getTasksPlanets = (contest_id: number, nomination_id: number): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASKS_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${contest_id}/nominations/${nomination_id}/tasks`);
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASKS_SUCCESS,
        payload: response.data.tasks,
      });

      return response.data.tasks;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASKS_FAIL,
        error: 'Something went wrong',
      });
    }
  };


export const getTasksSponsors = (contest_id: number, nomination_id: number,/*   onSuccess?: (data: ITask) => void,*/): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASKS_SPONSORS_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${contest_id}/nominations/${nomination_id}/tasks`);
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASKS_SPONSORS_SUCCESS,
        payload: response.data.tasks,
      });


      //response.data as IReanswerSolution
      return response.data.tasks;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASKS_SPONSORS_FAIL,
        error: 'Something went wrong',
      });
    }
  };


export const getTask = (
  contest_id: number,
  nomination_id: number,
  task_id: number,
  onSuccess?: () => void,
): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASK_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${contest_id}/nominations/${nomination_id}/tasks/${task_id}`);
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASK_SUCCESS,
        payload: response.data.task,
      });

      if (onSuccess) onSuccess();
      return response.data.task;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_TASK_FAIL,
        error: 'Something went wrong',
      });
    }
  };

export const getRandomTask = (
  contest_id: number,
  nomination_id: number,
  onSuccess?: () => void,
): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_RANDOM_TASK_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${contest_id}/nominations/${nomination_id}/random-task`);
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_RANDOM_TASK_SUCCESS,
        payload: response.data.task,
      });

      if (onSuccess) onSuccess();
      return response.data.task;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.GET_RANDOM_TASK_FAIL,
        error: 'Something went wrong',
      });
    }
  };

export const sendAnswer = (
  contest_id: number,
  nomination_id: number,
  task_id: number,
  answer: number,
  onSuccess?: () => void,
): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.SEND_ANSWER_REQUEST,
      });
      const response: any = await clientApi.post(`contests/${contest_id}/nominations/${nomination_id}/tasks/${task_id}/answer`, {
        task_id: String(task_id),
        text: String(answer)
      });
      dispatch({
        type: RUBRIC_PAGE_TYPES.SEND_ANSWER_SUCCESS,
        payload: response.data,
      });

      if (onSuccess) onSuccess();
      return response.data;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.SEND_ANSWER_FAIL,
        error: 'Something went wrong',
      });
    }
  };

export const sendReanswer = (
  contest_id: number,
  nomination_id: number,
  task_id: number,
  answer: number,
  onSuccess?: (data: IReanswerSolution) => void,
): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: RUBRIC_PAGE_TYPES.SEND_REANSWER_REQUEST,
      });
      const response: any = await clientApi.post(`contests/${contest_id}/nominations/${nomination_id}/tasks/${task_id}/reanswer`, {
        task_id: String(task_id),
        text: String(answer)
      });
      dispatch({
        type: RUBRIC_PAGE_TYPES.SEND_REANSWER_SUCCESS,
        payload: response.data,
      });

      if (onSuccess) onSuccess(response.data as IReanswerSolution);
      return response.data;
    } catch (e: any) {
      dispatch({
        type: RUBRIC_PAGE_TYPES.SEND_REANSWER_FAIL,
        error: 'Something went wrong',
      });
    }
  };