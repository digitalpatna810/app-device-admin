import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInResponse {
  user: User;
  token: string;
}

interface SignInError {
  message: string;
  [key: string]: any;
}

interface UserListResponse {
  users: User[];
}

interface UserListError {
  message: string;
  [key: string]: any;
}

interface ProfileError {
  message: string;
}

interface ProfileResponse {
  admin: {
    _id: string;
    firstName: string;
    lastName: string;
    deviceId: string;
    phoneNumber: string;
    email: string;
    isVerified: boolean;
    verificationToken: string | null;
    verificationTokenExpiry: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
const BASE_URL = "http://13.126.47.200:5000"
// Async thunk for sign-in
export const signIn = createAsyncThunk<
  SignInResponse,
  { email: string; password: string },
  { rejectValue: SignInError }
>('auth/signIn', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/admin/login`,
      formData
    );

    const { token, data: user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: 'Unknown error occurred' }
    );
  }
});

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk<
  UserListResponse,
  { token: string; userId: string },
  { rejectValue: UserListError }
>('auth/fetchUsers', async ({ token, userId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/users`, {
      params: { user_id: userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: 'Failed to fetch users' }
    );
  }
});

// Async thunk for fetching the admin profile
export const fetchProfile = createAsyncThunk<
  ProfileResponse,
  { token: string },
  { rejectValue: ProfileError }
>('auth/fetchProfile', async ({ token }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/admin/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: 'Failed to fetch profile' }
    );
  }
});

// Define the auth state
interface AuthState {
  token: string | null;
  user: any | null;
  users: User[];
  profile: ProfileResponse | null;
  loading: boolean;
  error: string | null;
  isAuthenticated?: boolean;
}

// Initial state
const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  users: [],
  profile: null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.token = null;
      state.user = null;
      state.profile = null;
      state.users = [];
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setAuth(state, action: PayloadAction<{ token: string; user: any }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // Handle signIn actions
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Sign-in failed';
      });

    // Handle fetchUsers actions
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users';
      });

    // Handle fetchProfile actions
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch profile';
      });
  },
});

export const { setToken, setUser, signOut, setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;