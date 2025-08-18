import { User } from '@/contexts/AuthContext';

// API Configuration and HTTP Client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://unified-backend-0z4c.onrender.com';

// API Response Types
export interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  data?: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  usn: string;
  semester: number;
  department: string;
}

export interface SignupResponse {
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  developmentOTP?: string;
}

export interface ResetPasswordRequest {
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// Team API Types
export interface TeamMember {
  _id: string;
  fullName: string;
  usn: string;
  currentSemester: number;
  department: string;
}

export interface Team {
  _id: string;
  teamName: string;
  teamLeader: User; 
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamRequest {
  teamName: string;
  members: Omit<TeamMember, '_id'>[];
}

export type UpdateTeamRequest = Partial<CreateTeamRequest>;

// Event API Types
export interface Event {
  _id: string;
  name: string;
  description: string;
  category: string[];
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxSeats: number;
  registeredTeams: Team[];
  seatsAvailable: number;
  createdAt: string;
  updatedAt: string;
}

// Custom Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// HTTP Client with error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('uniconnect_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.error || `HTTP error! status: ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error occurred',
        0
      );
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  public async getProfile(): Promise<User> {
    return this.request<User>('/api/users/me');
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Authentication API functions
export const authApi = {
  login: (credentials: LoginRequest): Promise<LoginResponse> => {
    console.log('Sending login credentials:', credentials);
    return apiClient.post<LoginResponse>('/api/users/login', credentials);
  },

  signup: (userData: SignupRequest): Promise<SignupResponse> =>
    apiClient.post<SignupResponse>('/api/users/register', userData),

  forgotPassword: (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> =>
    apiClient.post<ForgotPasswordResponse>('/api/users/forgot-password', data),

  resetPassword: (token: string, data: ResetPasswordRequest): Promise<ResetPasswordResponse> =>
    apiClient.put<ResetPasswordResponse>(`/api/users/reset-password/${token}`, data),
};

// Team API functions
export const teamApi = {
  getMyTeams: (): Promise<Team[]> => apiClient.get<Team[]>('/api/teams'),
  createTeam: (teamData: CreateTeamRequest): Promise<Team> => 
    apiClient.post<Team>('/api/teams', teamData),
  updateTeam: ({ teamId, teamData }: { teamId: string; teamData: UpdateTeamRequest }): Promise<Team> =>
    apiClient.put<Team>(`/api/teams/${teamId}`, teamData),
  deleteTeam: (teamId: string): Promise<void> => 
    apiClient.delete<void>(`/api/teams/${teamId}`),
};

// Event API functions
export const eventApi = {
  getEvents: (): Promise<Event[]> => apiClient.get<Event[]>('/api/events'),
  getEventById: (id: string): Promise<Event> => apiClient.get<Event>(`/api/events/${id}`),
  registerTeamForEvent: ({ eventId, teamId }: { eventId: string; teamId: string }): Promise<Event> => 
    apiClient.post<Event>(`/api/events/register`, { eventId, teamId }),
};

// Export API client for other modules
export default apiClient;
