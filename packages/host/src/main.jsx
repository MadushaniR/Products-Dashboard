import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MyProvider } from 'remoteApp/MyProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <MyProvider>
        <App />
      </MyProvider>
    </ChakraProvider>
  </StrictMode>
);
