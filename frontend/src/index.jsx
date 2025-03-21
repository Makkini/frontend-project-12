import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import './index.scss';

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(await init());
};

app();