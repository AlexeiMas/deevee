import { connect } from 'react-redux';
import { IRootState } from '../../store/store';
import Self from './BowlsPage';

const mapStateToProps = ({ gamePage }: IRootState) => ({
  getNominationsData: gamePage.getNominationsData,
});

const BowlsPage = connect(
  mapStateToProps,
  null
)(Self);

export default BowlsPage;
