import { connect } from 'react-redux';
import Self from './FormPage';
import { sendForm } from '../../actions/formPage/FormPage.actions';
import { sendAnswer } from '../../actions/gamePage/GamePage.actions';

const mapDispatchToProps = {
  sendForm,
  sendAnswer,
};

const FormPage = connect(
  null,
  mapDispatchToProps
)(Self);

export default FormPage;
