import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Замените HashRouter на BrowserRouter
import { Provider } from "react-redux";
import { store } from "./store/store";

import PageLogin from './page/PageLogin';
import PageSignup from './page/PageSignup';
import PageOTP from './page/PageOTP';
import Page404 from './page/Page404';
import PageLayout from './page/PageLayout';
import PageDashboard from './page/PageDashboard';
import PageExchange from './page/PageExchange';
import PageHistory from './page/PageHistory';
import PageSettings from './page/PageSettings';
import PageBusiness from './page/PageBusiness';
import PageDocuments from './page/PageDocuments';
import PageServices from './page/PageServices';
import Landing from './page/Landing';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* публичные страницы */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/signup" element={<PageSignup />} />
          <Route path="/otp" element={<PageOTP />} />

          <Route path="/business" element={<PageBusiness />} />
          <Route path="/documents" element={<PageDocuments />} />
          <Route path="/services" element={<PageServices />} />

          {/* кабинет */}
          <Route path="/app" element={<PageLayout />}>
            <Route index element={<PageDashboard />} />
            <Route path="dashboard" element={<PageDashboard />} />
            <Route path="exchange" element={<PageExchange />} />
            <Route path="history" element={<PageHistory />} />
            <Route path="history/:coin" element={<PageHistory />} />
            <Route path="settings" element={<PageSettings />} />
            <Route path="*" element={<Page404 />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;