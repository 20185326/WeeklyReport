import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewReportForm from './assets/views/ViewReportForm';
import ViewToddler from './assets/views/ViewToddler';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ViewReportForm />} />
          <Route path="ViewReportForm" element={<ViewReportForm />} />
          <Route path="ViewToddler" element={<ViewToddler />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;