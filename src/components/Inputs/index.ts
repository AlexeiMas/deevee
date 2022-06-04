import { connect } from 'react-redux';

import Self from './SearchInput';
import { getRatingItems } from '../../actions/leaderboardPage/leaderboardPage.actions';

const mapDispatchToProps = {
  getRatingItems,
};

export const SearchInput = connect(
  null,
  mapDispatchToProps
)(Self);
