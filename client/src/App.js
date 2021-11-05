import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Tickets } from './components/Tickets/Tickets';
import { Projects } from './components/Projects/Projects';
import { Members } from './components/Members/Members';
import { Notifs } from './components/Notifs';
import { Account } from './components/Account';
import { Create } from './components/Create';
import { TeamLogin } from './components/TeamLogin';
import { CreateTeam } from './components/CreateTeam';
import { MembersAdmin } from './components/Members/MembersAdmin';
import { MembersPmDev } from './components/Members/MembersPmDev';
import { TicketsAdminPm } from './components/Tickets/TicketsAdminPm';
import { TicketsDev } from './components/Tickets/TicketsDev';
import { ProjectsAdminPm } from './components/Projects/ProjectsAdminPm';
import { ProjectsDev } from './components/Projects/ProjectsDev';
import { CreateProject } from './components/Projects/CreateProject';
import { ViewProject } from './components/Projects/ViewProject';
import { NewTicket } from './components/Tickets/NewTicket';

import { mapCredentials } from './redux/mapToProps.js';

import { getTeamInfo } from './helpers';

import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import { useEffect } from 'react';

const AppComponent = props => {

  let location = useLocation();

  let history = useHistory();

  useEffect(() => {

    console.log(props.teamInfo);
        
    if (!props.userInfo.username
      && location.pathname !== '/create'
    ) {
  
      history.push('/login');
  
    } else if (!props.userInfo.teamUsername
        && location.pathname !== '/create-team'
        && location.pathname !== '/create'
      ) {
  
          history.push('/team-login');
  
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, location.pathname]);

useEffect(() => {

    getTeamInfo();

}, [location.pathname]);


  return (

    <div id="app">

        <Navbar />

          <Switch>

            <Route path="/" component={Dashboard} exact />

            <Route path="/create" component={Create} />

            <Route path="/login" component={Login} />

            <Route path="/tickets" component={Tickets} />

            <Route path="/members" component={Members} />

            <Route path="/projects" component={Projects} />

            <Route path="/notifs" component={Notifs} />

            <Route path="/account" component={Account} />

            <Route path="/team-login" component={TeamLogin} />

            <Route path="/create-team" component={CreateTeam} />

            <Route path="/members-admin" component={MembersAdmin} />

            <Route path="/members-pm-dev" component={MembersPmDev} />

            <Route path="/tickets-admin-pm" component={TicketsAdminPm} />

            <Route path="/tickets-dev" component={TicketsDev} />

            <Route path="/projects-admin-pm" component={ProjectsAdminPm} />

            <Route path="/projects-dev" component={ProjectsDev} />

            <Route path="/create-project" component={CreateProject} />

            <Route path="/view-project" component={ViewProject} />

            <Route path="/new-ticket" component={NewTicket} />

          </Switch>

      </div>    

  );
  
}

const App = connect(mapCredentials)(AppComponent);

export default App;