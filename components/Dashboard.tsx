import { Platform } from 'react-native';

const Dashboard = Platform.OS === 'web'
  ? require('./Dashboard.web').default
  : require('./Dashboard.mobile').default;

export default Dashboard;

