import { setToken } from "../../actions/user/User.actions";
import { connect } from 'react-redux';
import { HomePage as Self } from './HomePage';
import { IRootState } from '../../store/store';

const mapStateToProps = ({ user }: IRootState) => ({
  token: user.token,
});

const mapDispatchToProps = {
  setToken,
};

const HomePage = connect(mapStateToProps, mapDispatchToProps)(Self);

export default HomePage;
