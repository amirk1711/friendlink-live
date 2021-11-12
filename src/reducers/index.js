import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import profile from './profile';
import suggestions from './suggestions';
import search from './search';
import chat from './chat';
import accounts from './accounts';

// combine all these reducers and export it by default
export default combineReducers({
    posts,
    auth,
    profile,
    suggestions,
    search,
    chat,
    accounts,
});
