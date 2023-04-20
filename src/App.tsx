import React, { useEffect } from 'react';
import GlobalStyles from 'styles/GlobalStyles';
import Router from './routes/Router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env._KAKAO_JS_API_KEY}&libraries=clusterer&autoload=false`;
    document.head.appendChild(script);
  }, []);
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
