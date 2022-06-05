import { connect } from 'react-redux';
import { IRootState } from '../../store/store';
import { GamePage as Self } from './GamePage';
import { getСontests } from "../../actions/user/User.actions";
import { joinСontest, getNominations, getTasksMustHave, getTask, getRandomTask, setFormState } from '../../actions/gamePage/GamePage.actions';
import { getForm } from '../../actions/formPage/FormPage.actions';

const mapStateToProps = ({ user, gamePage }: IRootState) => ({
  token: user.token,
  getContestsError: user.getContestsError,
  getContestsData: user.getContestsData,
  joinContestError: gamePage.joinContestError,
  getNominationsData: gamePage.getNominationsData,
  getNominationsError: gamePage.getNominationsError,
  getTasksMustHaveData: gamePage.getTasksMustHaveData,
  formState: gamePage.formState,
});

const mapDispatchToProps = {
  getСontests,
  joinСontest,
  getNominations,
  getTasksMustHave,
  getTask,
  getRandomTask,
  setFormState,
  getForm,
};

const GamePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Self);

export default GamePage;
