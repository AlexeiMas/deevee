import { connect } from 'react-redux';

import { Paginator as Self } from './Paginator';
import { getRatingItems } from '../../actions/leaderboardPage/leaderboardPage.actions';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  getRatingItems,
};

export const Paginator = connect(
  mapStateToProps,
  mapDispatchToProps
)(Self);
