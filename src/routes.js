import HomePage from '_pages/HomePage';
import AuthPage from '_pages/AuthPage';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/orders',
    exact: true,
    component: HomePage,
  },
  {
    path: '/auth',
    exact: true,
    component: AuthPage,
  },
];
