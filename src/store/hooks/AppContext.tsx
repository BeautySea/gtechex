import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface AppState {
  user: string | null;
}

interface AppContextProps {
  state: AppState;
  updateState: Dispatch<SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [state, updateState] = useState<AppState>({ user: null });

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, useAppContext };
