import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { fetchTeams, fetchTeamById } from '../store/teams-slice';

export const useTeams = (leagueId?: number, season?: number) => {
  const dispatch = useAppDispatch();
  const { teams, loading, error } = useAppSelector((state) => state.teams);
  
  useEffect(() => {
    dispatch(fetchTeams({ leagueId, season }));
  }, [dispatch, leagueId, season]);
  
  return { teams, loading, error };
};

export const useTeamDetails = (teamId: number) => {
  const dispatch = useAppDispatch();
  const { selectedTeam, loading, error } = useAppSelector((state) => state.teams);
  
  useEffect(() => {
    dispatch(fetchTeamById(teamId));
  }, [dispatch, teamId]);
  
  return { team: selectedTeam, loading, error };
};
