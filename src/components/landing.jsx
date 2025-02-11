import { Link } from 'react-router-dom';
import {world, continents } from '../containers/countries';

const LandingPage = () => {

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
        <div className="landing-container">
            <h2>Select a region to play</h2>
            <div className="continent-buttons">
                {Object.keys(regions).map((continent) => (
                    <Link key={continent} to={`/${continent}`}>
                        <button>{continent}</button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
