"use client"

import React, { createContext, useContext, useState } from "react";
import { UserSettingsModel } from "../user/models";

type UserSettingsContextType = {
    settings: UserSettingsModel;
    toggleSetting: (key: keyof UserSettingsModel) => boolean;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

interface UserSettingsProviderProps {
  _settings: UserSettingsModel;
  children: React.ReactNode;
}

export function UserSettingsProvider({ children, _settings }: UserSettingsProviderProps) {
    const [settings, setSettings] = useState<UserSettingsModel>(_settings);

    const toggleSetting = (key: keyof UserSettingsModel): boolean => {
      const newValue = !settings[key];
      setSettings(prev => ({
        ...prev,
        [key]: newValue,
      }));
      return newValue;
    };

    return (
        <UserSettingsContext.Provider value={{
          settings,
          toggleSetting }}
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