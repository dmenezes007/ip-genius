import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const STORAGE_KEYS = {
  stats: 'aura_user_stats',
  missions: 'aura_missions',
  badges: 'aura_badges',
  rewards: 'aura_rewards',
  activities: 'aura_activities',
} as const;

export interface PersistedAuraState {
  aura_user_stats: unknown;
  aura_missions: unknown;
  aura_badges: unknown;
  aura_rewards: unknown;
  aura_activities: unknown;
}

const TABLE_NAME = 'aura_user_state';

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUp(email: string, password: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export function onAuthChanged(callback: (user: User | null) => void) {
  if (!supabase) {
    return { unsubscribe: () => undefined };
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return subscription;
}

export async function loadRemoteState(userId: string): Promise<PersistedAuraState | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('payload')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return (data?.payload as PersistedAuraState) ?? null;
}

export async function saveRemoteState(userId: string, payload: PersistedAuraState) {
  if (!supabase) return;

  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert({ user_id: userId, payload, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });

  if (error) throw error;
}

export function readLocalSnapshot(): PersistedAuraState {
  return {
    aura_user_stats: JSON.parse(localStorage.getItem(STORAGE_KEYS.stats) || 'null'),
    aura_missions: JSON.parse(localStorage.getItem(STORAGE_KEYS.missions) || 'null'),
    aura_badges: JSON.parse(localStorage.getItem(STORAGE_KEYS.badges) || 'null'),
    aura_rewards: JSON.parse(localStorage.getItem(STORAGE_KEYS.rewards) || 'null'),
    aura_activities: JSON.parse(localStorage.getItem(STORAGE_KEYS.activities) || 'null'),
  };
}

export function writeLocalSnapshot(snapshot: PersistedAuraState) {
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(snapshot.aura_user_stats));
  localStorage.setItem(STORAGE_KEYS.missions, JSON.stringify(snapshot.aura_missions));
  localStorage.setItem(STORAGE_KEYS.badges, JSON.stringify(snapshot.aura_badges));
  localStorage.setItem(STORAGE_KEYS.rewards, JSON.stringify(snapshot.aura_rewards));
  localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(snapshot.aura_activities));
}

export function clearLocalSnapshot() {
  localStorage.removeItem(STORAGE_KEYS.stats);
  localStorage.removeItem(STORAGE_KEYS.missions);
  localStorage.removeItem(STORAGE_KEYS.badges);
  localStorage.removeItem(STORAGE_KEYS.rewards);
  localStorage.removeItem(STORAGE_KEYS.activities);
}
