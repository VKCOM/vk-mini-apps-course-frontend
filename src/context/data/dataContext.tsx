import { createContext, useState } from 'react';

import { TData, TDataContext, TProps } from './types';

export const DataContext = createContext<TDataContext | null>(null);

export const DataContextProvider = ({ children }: TProps) => {
  const [data, setData] = useState<TData | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
