import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './components/Join/Join'; // Importa Join dos componentes
import Chat from './components/Chat/Chat'; // Importa Chat dos componentes

const App = () => (
    <Router>
        <Route path="/"exact component={Join} />
        <Route path="/chat" component={Chat} />

    </Router>
);

export default App;