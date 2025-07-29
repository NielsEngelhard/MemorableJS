import { EventEmitter } from 'events';
import { MpLobbyPlayerModel } from '@/features/mp-lobby/models';

class GameEventEmitter extends EventEmitter {}
export const gameEvents = new GameEventEmitter();

export const GAME_EVENTS = {
  PLAYER_JOINED_LOBBY: 'playerJoinedLobby',
  PLAYER_LEFT_LOBBY: 'playerLeftLobby',
} as const;

// Type-safe event emitters
export const emitPlayerJoinedLobbyEvent = (lobbyId: string, player: MpLobbyPlayerModel) => {
  gameEvents.emit(GAME_EVENTS.PLAYER_JOINED_LOBBY, { lobbyId, player });
};

export const emitPlayerLeftLobbyEvent = (lobbyId: string, playerId: string) => {
  gameEvents.emit(GAME_EVENTS.PLAYER_LEFT_LOBBY, { lobbyId, playerId });
};