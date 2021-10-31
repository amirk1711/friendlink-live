import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './responsive.css';
import App from './components/App';
import { configureStore } from './store';
import { Provider } from 'react-redux';

// everything in redux belongs to a single store
// configure redux store where our app's state lives in
const store = configureStore();

// Provider will make redux store available
// to the every component of our react app
ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
