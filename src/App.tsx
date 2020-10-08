import React, { FC } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { configureAppStore } from './store/configureStore';
import NavigationBar from './shared/navigation-bar';
import routes, { renderRoutes } from './Routes';

const history = createBrowserHistory();

const App: FC = () => {
  const store = configureAppStore();

  return (
    <Provider store={store}>
      <Router history={history}>
        <>
          <NavigationBar />
          <div className={'container'}>{renderRoutes(routes)}</div>
        </>
      </Router>
    </Provider>
  );
};
export default App;
