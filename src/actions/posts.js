import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
    ADD_POST,
    UPDATE_POSTS,
    ADD_COMMENT,
    UPDATE_POST_LIKE,
    DELETE_POST_SUCCESSFULL,
    REMOVE_COMMENT,
} from './actionTypes';

const sortOn = require('sort-on');

export function fetchPosts() {
    return (dispatch) => {
        const url = APIUrls.fetchPosts();
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                let sortedTimelinePosts = sortOn(data.data.timelinePosts, '-createdAt');
                // console.log('sorted poists', sortedTimelinePosts);
                dispatch(updatePosts(sortedTimelinePosts));
            });
    };
}

export function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts,
    };
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post,
    };
}

export function createPost(content, contentType, caption) {
    return (dispatch) => {
        const url = APIUrls.createPost();

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
            body: getFormBody({
                content,
                contentType,
                caption,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('CREATE POST data', data);

                if (data.success) {
                    dispatch(addPost(data.data.post));
                }
            });
    };
}

export function createComment(content, post) {
    return (dispatch) => {
        const url = APIUrls.createComment();
        console.log('before fetching comment');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
            body: getFormBody({ content, post }),
        })
            .then((response) => {
                console.log('res', response);
                return response.json();
            })
            .then((data) => {
                console.log('Comment data', data);
                if (data.success) {
                    dispatch(addComment(data.data.comment, post));
                }
            });
    };
}

export function deleteComment(id, postId) {
    return (dispatch) => {
        const url = APIUrls.deleteComment(id);
        console.log('before deleting comment');
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => {
                console.log('res', response);
                return response.json();
            })
            .then((data) => {
                console.log('Comment data', data);
                if (data.success) {
                    dispatch(removeComment(id, postId));
                }
            });
    };
}

export function removeComment(id, postId){
    return {
        type: REMOVE_COMMENT,
        id,
        postId,
    }
}

export function addComment(comment, postId) {
    return {
        type: ADD_COMMENT,
        comment,
        postId,
    };
}

// id can be either post id or comment id
// because like can be made either on post or comment
export function addLike(id, likeType, userId) {
    return (dispatch) => {
        const url = APIUrls.toggleLike(id, likeType);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('LIKE data', data);
                if (data.success) {
                    dispatch(addLikeToStore(id, userId, data.data.likes));
                }
            });
    };
}

export function addLikeToStore(postId, userId, likes) {
    return {
        type: UPDATE_POST_LIKE,
        postId,
        userId,
        likes,
    };
}

export function deletePost(postId) {
    return (dispatch) => {
        const url = APIUrls.deletePost(postId);
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Delete Post data: ', data);
                if (data.success) {
                    dispatch(deletePostSuccessfull(postId));
                }
            });
    };
}

export function deletePostSuccessfull(postId) {
    return {
        type: DELETE_POST_SUCCESSFULL,
        postId,
    };
}
