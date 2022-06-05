import { connect } from 'react-redux';
import Self from './FormPage';
import { sendForm } from '../../actions/formPage/FormPage.actions';

const mapDispatchToProps = {
  sendForm,
};

const FormPage = connect(
  null,
  mapDispatchToProps
)(Self);

export default FormPage;
