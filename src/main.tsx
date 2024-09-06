import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './store/hooks/AppContext.tsx';
import AuthProvider from './providers/authProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppContextProvider>
  </BrowserRouter>
);
