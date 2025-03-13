import React from 'react';
import './App.css';
import { Layout } from './components/layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ToastProvider} from "./context/ToastContext"

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Layout />
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
