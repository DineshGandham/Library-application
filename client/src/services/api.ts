import axios from 'axios';

// Use a more reliable approach for the API base URL
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const bookService = {
  getAll: () => api.get('/books'),
  getById: (id: string) => api.get(`/books/${id}`),
  create: (data: FormData) => api.post('/books', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id: string, data: FormData) => api.put(`/books/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id: string) => api.delete(`/books/${id}`),
  search: (query: string) => api.get(`/books/search/${query}`),
};

export const memberService = {
  getAll: () => api.get('/members'),
  getById: (id: string) => api.get(`/members/${id}`),
  create: (data: any) => api.post('/members', data),
  update: (id: string, data: any) => api.put(`/members/${id}`, data),
  delete: (id: string) => api.delete(`/members/${id}`),
  search: (query: string) => api.get(`/members/search/${query}`),
};

export const authService = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    api.post('/auth/register', data),
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentActivity: () => api.get('/dashboard/recent-activity'),
};

// Borrowing service
export const borrowingService = {
  getAll: () => api.get('/borrowings'),
  getByMember: (memberId: string) => api.get(`/borrowings/member/${memberId}`),
  create: (data: { bookId: string; memberId: string; dueDate: string }) =>
    api.post('/borrowings', data),
  return: (id: string) => api.put(`/borrowings/${id}/return`),
  getOverdue: () => api.get('/borrowings/overdue'),
  getStats: () => api.get('/borrowings/stats'),
};

export default api; 