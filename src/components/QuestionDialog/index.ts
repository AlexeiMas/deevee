import { connect } from 'react-redux';
import { IRootState } from '../../store/store';
import Self from './QuestionCard';
import { sendAnswer, getNominations } from '../../actions/gamePage/GamePage.actions';

const mapStateToProps = ({ gamePage }: IRootState) => ({
  currentTask: gamePage.getTaskData,
  sendAnswerLoading: gamePage.sendAnswerLoading,
  sendAnswerData: gamePage.sendAnswerData,
});

const mapDispatchToProps = {
  getNominations,
  sendAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Self);
