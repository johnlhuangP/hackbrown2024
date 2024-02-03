
import yes from './images/yes.png';
import no from './images/no.png';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Brown Hackathon 2024
        </h1>
        <h2>
         
        </h2>
      </header>
      <div className='landing-page'>
        <h2>
          Welcome to the project web application!
        </h2>
        <p>
          This will be the landing page for the project web application.
        </p>
        <img src={yes} className="option" alt="yes" />
        <img src={no} className="option" alt="no" />
      </div>
    </div>
  );
}

export default App;
