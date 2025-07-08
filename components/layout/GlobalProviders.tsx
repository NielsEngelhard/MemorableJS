'use client';

import { AuthProvider } from "@/features/auth/auth-context";
import { UserSettingsProvider } from "@/features/settings/user-settings-context";
import { UserSettingsModel } from "@/features/user/models";

type Props = {
    children: React.ReactNode;
}

var hardCodedSettings: UserSettingsModel = {
  id: "",
  playSoundEffects: false,
  preFillWord: true,
  showOnScreenKeyboard: true
}

export function Providers({ children }: Props) {
  return (
      <AuthProvider>
        <UserSettingsProvider _settings={hardCodedSettings}>
          {children}
        </UserSettingsProvider>
      </AuthProvider>
  );
}