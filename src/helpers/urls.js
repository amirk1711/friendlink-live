// const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';
const API_ROOT = 'https://friendlink-app.herokuapp.com/api/v1';
// const API_ROOT = 'http://localhost:8000/api/v1';

export const APIUrls = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,

    userProfile: (id) => `${API_ROOT}/users/profile/${id}`,
    editProfile: (id) => `${API_ROOT}/users/update/${id}`,

    createPost: () => `${API_ROOT}/posts/create`,
    deletePost: (id) => `${API_ROOT}/posts/${id}`,
    fetchPosts: () => `${API_ROOT}/posts/timeline/all`,

    follow: (id) => `${API_ROOT}/users/follow/${id}`,
    unfollow: (id) => `${API_ROOT}/users/unfollow/${id}`,

    createComment: () => `${API_ROOT}/comments/create`,
    deleteComment: (id) => `${API_ROOT}/comments/destroy/${id}`,

    toggleLike: (id, likeType) => `${API_ROOT}/likes/toggle?id=${id}&type=${likeType}`,
    fetchposts: (id, likeType) => `${API_ROOT}/likes/fetch?id=${id}&type=${likeType}`,

    userSearch: (searchText) => `${API_ROOT}/users/search?text=${searchText}`
};