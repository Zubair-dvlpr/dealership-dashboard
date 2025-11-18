import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Router from './router';
import Toast from './components/shared/ShowToast';
// testing chaanges
function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Router />
    </BrowserRouter>
  );
}

export default App;
