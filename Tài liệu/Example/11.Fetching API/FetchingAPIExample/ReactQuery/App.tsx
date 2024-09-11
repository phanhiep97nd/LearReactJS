import React from 'react';
import ListFilm from './ListFilm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
		<QueryClientProvider client={queryClient}>
		  <ListFilm />
		</QueryClientProvider>
  );
};

export default App;
