import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { History } from 'history';

import GlobalStyle from './styles/GlobalStyle';

import Login from './containers/Login';
import Register from './containers/Register';
import NewsFeed from './containers/NewsFeed';
import Navbar from './components/Navbar';
import Profile from './containers/Profile';
import services from './services';

interface IAppProps {
  history: History;
  loadInitialData: () => void;
}

const App: React.FC<IAppProps> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { auth } = services;

    auth.onAuthStateChanged((user) => {
      if (user) {
        const { loadInitialData } = props;
        loadInitialData();

        if (['/', '/register'].indexOf(location.pathname) > -1) {
          const { history } = props;

          history.push('/app/newsfeed');
        }
      } else {
        if (/\app\/./.test(location.pathname)) {
          const { history } = props;

          history.push('/');
        }
      }
      
      setLoading(false);
    });
  }, []);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <GlobalStyle />
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/app" component={Navbar} />
      <Route exact path="/app/newsfeed" component={NewsFeed} />
      <Route exact path="/app/profile" component={Profile} />
    </>
  );
};

export default App;
