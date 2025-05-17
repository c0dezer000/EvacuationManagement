import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import IncidentDashboard from './pages/IncidentDashboard';
import EvacuationCenterForm from './pages/EvacuationCenterForm';
import EvacuationCenterDirectory from './pages/EvacuationCenterDirectory';
import ReportsDashboard from './pages/ReportsDashboard';
import NotFound from './pages/NotFound';
import { UserProvider } from './context/UserContext';
import { IncidentProvider } from './context/IncidentContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <IncidentProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<IncidentDashboard />} />
              <Route path="evacuation-center/:id?" element={<EvacuationCenterForm />} />
              <Route path="directory" element={<EvacuationCenterDirectory />} />
              <Route path="reports" element={<ReportsDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </IncidentProvider>
      </UserProvider>
    </Router>
  );
}

export default App;