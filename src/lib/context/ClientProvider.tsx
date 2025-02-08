// components/ClientProvider.tsx (Client Component)
'use client';

import { User } from '@supabase/supabase-js';
import { createContext, useContext, useState, ReactNode } from 'react';


export interface UserWithToken extends User{
    accessToken : string,
}

interface UserContextType {
  user: UserWithToken;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}

export default function ClientProvider({ user, children }: { user: UserWithToken , children: ReactNode }) {

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
