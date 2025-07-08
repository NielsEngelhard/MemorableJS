import React, { createContext, useContext, useState } from "react";
import { UserSettingsModel } from "../user/models";

type UserSettingsContextType = {
    settings: UserSettingsModel;
    setSettings: (v: UserSettingsModel) => void;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

interface LetterLeagueGameProviderProps {
  _settings: UserSettingsModel;
  children: React.ReactNode;
}

export function UserSettingsProvider({ children, _settings }: LetterLeagueGameProviderProps) {
    const [settings, setSettings] = useState<UserSettingsModel>(_settings);

    return (
        <UserSettingsContext.Provider value={{
          settings,
          setSettings }}
        >
          {children}
        </UserSettingsContext.Provider>
    )
}

export function useUserSettings() {
  const context = useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error('useUserSettings must be used within an UserSettingsContext');
  }
  return context;
}