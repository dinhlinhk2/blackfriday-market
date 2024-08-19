import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AllProviders } from './combineProviders';

createRoot(document.getElementById('root')).render(
    <AllProviders>
        <App />
    </AllProviders>,
);
