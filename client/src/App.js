import React from 'react';

//Import all components for react router
import { Login } from './components/Login.js';
import { Navbar } from './components/Navbar.js';
import { Dashboard } from './components/Dashboard.js';
import { Tickets } from './components/Tickets.js';
import { Projects } from './components/Projects.js';
import { Users } from './components/Users.js';
import { Notifs } from './components/Notifs.js';
import { Account } from './components/Account.js';
import { Create } from './components/Create.js';
import { TeamLogin } from './components/TeamLogin';
import { CreateTeam } from './components/CreateTeam';

//React router components
import { Switch, Route } from 'react-router-dom';

//Main app parent component utilizing the react router library
class App extends React.Component {

  render() {
    return (

      <div id="app">

        <Navbar />

          <Switch>

            <Route path="/" component={Dashboard} exact />
            <Route path="/create" component={Create} />
            <Route path="/login" component={Login} />
            <Route path="/tickets" component={Tickets} />
            <Route path="/users" component={Users} />
            <Route path="/projects" component={Projects} />
            <Route path="/notifs" component={Notifs} />
            <Route path="/account" component={Account} />
            <Route path="/team-login" component={TeamLogin} />
            <Route path="/create-team" component={CreateTeam} />

          </Switch>

      </div>

    );

  }

}

export default App;