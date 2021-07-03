import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import profile from './profile';
import friends from './friends';
import search from './search';

// combine all these reducers and export it by default
export default combineReducers({
    posts,
    auth,
    profile,
    friends,
    search,
});
