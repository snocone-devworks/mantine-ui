import React, { createContext, useContext, useRef } from 'react';

type AppContainerContextInfo = {
  bodyRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const AppContainerContext = createContext<AppContainerContextInfo>({ bodyRef: React.createRef() });

type AppContainerContextProviderProps = {
  children?: React.ReactNode;
}

export const AppContainerContextProvider = (props: AppContainerContextProviderProps) => {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  return (
    <AppContainerContext.Provider value={{ bodyRef: bodyRef }}>
      {props.children}
    </AppContainerContext.Provider>
  )
}

export const useBodyRef = () => {
  const context = useContext(AppContainerContext);

  if (!context) throw new Error('Must be used within a AppContainerContextProvider');

  return context.bodyRef;
}