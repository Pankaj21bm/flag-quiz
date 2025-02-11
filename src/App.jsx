import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing';
import Quiz from './components/quiz';
import { world, continents } from './containers/countries';

function App() {

  const regions = {
    "Asia": continents.Asia,
    "Europe": continents.Europe,
    "Africa": continents.Africa,
    "North America": continents.North_America,
    "South America": continents.South_America,
    "Oceania": continents.Oceania,
    "World": world,
  };

  return (
    <Router>
      <div className="App">
        <h1>Flag Quiz</h1>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {Object.keys(regions).map((continent) => (
            <Route
              key={continent}
              path={`/${continent}`}
              element={<Quiz selectedCountries={regions[continent]} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
