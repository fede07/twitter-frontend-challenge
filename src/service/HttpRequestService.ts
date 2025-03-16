import type {PostData ,SingInData ,SingUpData} from './index';
import axios from 'axios';
import { S3Service } from './S3Service';
import apiClient from './apiClient';

const url =
  process.env.REACT_APP_API_URL || 'https://twitter-ieea.onrender.com/api';

const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    try {
      const res = await axios.post(`${url}/auth/signup`, data)
      if (res.status === 201) {
        localStorage.setItem('token', `Bearer ${res.data.token}`)
        return {success: true}
      }
    } catch (e) {
      if(axios.isAxiosError(e)) {
        if (e.response?.status === 409) {
          console.error(e.response.data)
        }
        return {success: false, error: e.response?.data, status: e.response?.status}
      }
      return {success: false, error: e, status: 500}
    }

  },
  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem('token', `Bearer ${res.data.token}`);
      return true;
    }
  },
  createPost: async (data: PostData) => {
    const payload = {
      content: data.content,
      parentId: data.parentId,
      images: data.images?.map((image) => image.name),
    }
    const res = await apiClient.post(`${url}/post`, payload);
    if (res.status === 201) {
      const { upload } = S3Service;
      for (const [index, image] of res.data.images.entries()) {
        await upload(data.images![index], image.url);
      }
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await apiClient.get(`${url}/post/${query}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPosts: async (query: string) => {
    const res = await apiClient.get(`${url}/post/${query}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await apiClient.get(`${url}/user/recommended`, {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    try {
      const res = await apiClient.get(`${url}/user/me`);
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  getPostById: async (id: string) => {
    console.log(`${url}/post/${id}`);
    const res = await apiClient.get(`${url}/post/${id}`);
    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: string) => {
    const res = await apiClient.post(`${url}/reaction/${postId}`, {
      type: reaction,
    });
    if (res.status === 201) {
      return res.data;
    }
  },
  isReacted: async (postId: string, reaction: string) => {
    const res = await apiClient.get(`${url}/reaction/${postId}`, {
      params: {
        type: reaction,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  deleteReaction: async (reactionId: string) => {
    const res = await apiClient.delete(`${url}/reaction/${reactionId}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await apiClient.post(`${url}/follow/${userId}`);
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await apiClient.delete(`${url}/follow/${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await apiClient.get(`${url}/user/search/`, {
        params: {
          username,
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await apiClient.get(`${url}/user/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await apiClient.get(`${url}/post/by_user/${id}`, {
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string) => {
    const res = await apiClient.get(`${url}/post/by_user/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  isLogged: async () => {
    const res = await apiClient.get(`${url}/user/me`);
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await apiClient.get(`${url}/user/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await apiClient.delete(`${url}/user/me`);
    if (res.status === 204) {
      localStorage.removeItem('token');
    }
  },

  getMutualFollows: async () => {
    const res = await apiClient.get(`${url}/follow/mutual`);
    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (id: string) => {
    const res = await apiClient.post(`${url}/chat`, {
      users: [id],
    });

    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await apiClient.get(`${url}/chat/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },

  getChats: async () => {
    const res = await apiClient.get(`${url}/chat`);

    if (res.status === 200) {
      return res.data;
    }
  },

  getChatMessages: async (id: string) => {
    const res = await apiClient.get(`${url}/message/${id}`);

    if(res.status === 200) {
      return res.data;
    }
  },

  getChatMessagesPaginated: async (id: string, limit: number, after: string) => {
    const res = await apiClient.get(`${url}/message/${id}`, {
      params: {
        limit,
        after,
      },
    })

    if(res.status === 200) {
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await apiClient.delete(`${url}/post/${id}`);
  },

  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await apiClient.get(`${url}/post/comment/by_post/${id}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },

  getCommentsByPostId: async (id: string) => {
    const res = await apiClient.get(`${url}/post/comment/by_post/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
// class HttpService {
//   service = httpRequestService;
// }

export { useHttpRequestService };
