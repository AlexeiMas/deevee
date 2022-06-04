import { connect } from 'react-redux';
import { IRootState } from '../../store/store';
import { GamePage as Self } from './GamePage';
import { getСontests } from "../../actions/user/User.actions";
import { joinСontest, getNominations } from '../../actions/gamePage/GamePage.actions';

const mapStateToProps = ({ user, gamePage }: IRootState) => ({
  token: user.token,
  getContestsError: user.getContestsError,
  getContestsData: user.getContestsData,
  joinContestError: gamePage.joinContestError,
  getNominationsData: gamePage.getNominationsData,
  getNominationsError: gamePage.getNominationsError,
});

const mapDispatchToProps = {
  getСontests,
  joinСontest,
  getNominations,
};

const GamePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Self);

export default GamePage;
