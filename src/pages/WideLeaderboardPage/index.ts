import { connect } from 'react-redux';
import {WideLeaderboardPage as Self} from './LeaderboardPage';
import { getRatingItems } from '../../actions/leaderboardPage/leaderboardPage.actions';
import { IRootState } from '../../store/store';

const mapStateToProps = ({ leaderboardPage }: IRootState) => ({
  getLeaderboardItemsData: leaderboardPage.getLeaderboardItemsData,
  getLeaderboardItemsLoading: leaderboardPage.getLeaderboardItemsLoading,
  currentPage: leaderboardPage.currentPage,
  pagesCount: leaderboardPage.pagesCount,
});

const mapDispatchToProps = {
  getRatingItems,
};

const WideLeaderboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Self);

export default WideLeaderboardPage;
