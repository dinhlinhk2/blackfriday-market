import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AllProviders } from './combineProviders';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
    <AllProviders>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </AllProviders>,
);
