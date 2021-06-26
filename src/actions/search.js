import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { APIUrls } from '../helpers/urls';


export function searchUsers(searchText) {
    return (dispatch) => {
        const url = APIUrls.userSearch(searchText);
        fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('SEARCH data', data);
                if(data.success){
                    dispatch(searhcResultsSuccess(data.data.users));
                }else{
                    dispatch(searhcResultsSuccess([]));
                }
            });
    };
}

export function searhcResultsSuccess(users) {
    return {
        type: FETCH_SEARCH_RESULTS_SUCCESS,
        users,
    };
}
