import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
// import TeamDetails from './pages/TeamDetails';
// import Leagues from './pages/Leagues';
// import Matches from './pages/Matches';
// import Players from './pages/Players';
// import JournalsList from './pages/Journals/List';
// import CreateJournal from './pages/Journals/Create';
// import EditJournal from './pages/Journals/Edit';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
          {/* <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/players" element={<Players />} />
          <Route path="/journals" element={<JournalsList />} />
          <Route path="/journals/new" element={<CreateJournal />} />
          <Route path="/journals/:id/edit" element={<EditJournal />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
