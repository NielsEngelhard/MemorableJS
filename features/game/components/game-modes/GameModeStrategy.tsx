import { GameMode } from "@/drizzle/schema";
import { Calendar, User, Users } from "lucide-react";

export interface IGameModeStrategy {
    name: string;
    color: string;
    Icon: React.ElementType;    
}

export const gameModeStrategies: Record<string, IGameModeStrategy> = {
  solo: {
    name: 'Solo',
    color: 'primary',
    Icon: User
  },
  multiplayer: {
    name: 'Multiplayer', 
    color: 'secondary',
    Icon: Users
  },
  wod: {
    name: 'Word of the Day',
    color: 'orange',
    Icon: Calendar
  }
};

export class GameModeFactory {
  static get(gameMode: GameMode): IGameModeStrategy {
    switch(gameMode) {
      case GameMode.Solo:
        return gameModeStrategies.solo
      case GameMode.Multiplayer:
        return gameModeStrategies.multiplayer
      case GameMode.WordOfTheDay:
        return gameModeStrategies.wod
    }
  }
}