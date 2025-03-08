import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTeams, getTeamById } from '../api/teams';
import { Team, TeamDetail } from '../types/team';

interface TeamsState {
  teams: Team[];
  selectedTeam: TeamDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  selectedTeam: null,
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async ({ leagueId, season }: { leagueId?: number; season?: number }, { rejectWithValue }) => {
    try {
      return await getTeams(leagueId, season);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch teams');
    }
  }
);

export const fetchTeamById = createAsyncThunk(
  'teams/fetchTeamById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await getTeamById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch team details');
    }
  }
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    clearSelectedTeam(state) {
      state.selectedTeam = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch team by ID
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamById.fulfilled, (state, action: PayloadAction<TeamDetail>) => {
        state.selectedTeam = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
