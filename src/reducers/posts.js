import {
    UPDATE_POSTS,
    ADD_POST,
    ADD_COMMENT,
    UPDATE_POST_LIKE,
    DELETE_POST_SUCCESSFULL,
    REMOVE_COMMENT,
} from '../actions/actionTypes';


export default function posts(state = [], action) {
    switch (action.type) {
        case UPDATE_POSTS:
            return action.posts;
        case ADD_POST:
            return [action.post, ...state];
        case ADD_COMMENT:
            const newPosts = state.map((post) => {
                if (post._id === action.postId) {
                    return {
                        ...post,
                        comments: [action.comment, ...post.comments],
                    };
                }

                return post;
            });
            return newPosts;
        case REMOVE_COMMENT:
            const delPostComment = state.map((post) => {
                if (post._id === action.postId) {
                    let newComments = post.comments;
                    

                    let finalComments = [];
                    
                    for (let comment of newComments) {
                        
                        if (comment._id !== action.id) {
                            finalComments.push(comment);
                        }
                    }

                
                    return {
                        ...post,
                        comments: finalComments,
                    };
                }

                return post;
            });
            return delPostComment;
        case UPDATE_POST_LIKE:
            const updatedPosts = state.map((post) => {
                if (post._id === action.postId) {
                    return {
                        ...post,
                        likes: action.likes,
                    };
                }
                return post;
            });
            return updatedPosts;
        case DELETE_POST_SUCCESSFULL:
            const delPosts = state.filter((post) => post._id !== action.postId);
            return delPosts;

        default:
            return state;
    }
}
