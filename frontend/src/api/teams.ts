import apiClient from './client';
import { Team, TeamDetail } from '../types/team';

export const getTeams = async (leagueId?: number, season?: number) => {
  const params = {
    ...(leagueId && { league_id: leagueId }),
    ...(season && { season }),
  };
  const response = await apiClient.get<Team[]>('/teams', { params });
  return response.data;
};

export const getTeamById = async (id: number) => {
  const response = await apiClient.get<TeamDetail>(`/teams/${id}`);
  return response.data;
};
