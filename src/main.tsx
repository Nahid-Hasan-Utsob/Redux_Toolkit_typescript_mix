import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';


const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
<React.StrictMode>
{/* Redux Toolkit Provider */}
<Provider store={store}>
{/* React Query Provider */}
<QueryClientProvider client={queryClient}>
{/* React Router DOM */}
<BrowserRouter>
<App />
</BrowserRouter>
</QueryClientProvider>
</Provider>
</React.StrictMode>
);