const API_ROOT = 'https://friendlink-app.herokuapp.com/api/v1';

export const APIUrls = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,

    userProfile: (id) => `${API_ROOT}/users/profile/${id}`,
    editProfile: (id) => `${API_ROOT}/users/update/${id}`,
    changeProfilePic: () => `${API_ROOT}/users/change/profile`,
    changeUserPassword: () => `${API_ROOT}/users/change/password`,
    deleteUser: (id) => `${API_ROOT}/users/${id}`,

    createPost: () => `${API_ROOT}/posts/create`,
    deletePost: (id) => `${API_ROOT}/posts/${id}`,
    fetchPosts: () => `${API_ROOT}/posts/timeline/all`,

    follow: (id) => `${API_ROOT}/users/follow/${id}`,
    unfollow: (id) => `${API_ROOT}/users/unfollow/${id}`,
    fetchSuggestions: (id) => `${API_ROOT}/users/suggestions/${id}`,

    createComment: () => `${API_ROOT}/comments/create`,
    deleteComment: (id) => `${API_ROOT}/comments/${id}`,

    toggleLike: (id, likeType) => `${API_ROOT}/likes/toggle?id=${id}&type=${likeType}`,
    fetchposts: (id, likeType) => `${API_ROOT}/likes/fetch?id=${id}&type=${likeType}`,

    userSearch: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,

    createChatUser: () => `${API_ROOT}/chat-users`,
    fetchChatUser: (id) => `${API_ROOT}/chat-users/${id}`,
    createChat: () => `${API_ROOT}/chats`,
    fetchChat: (id) => `${API_ROOT}/chats/${id}`,

};