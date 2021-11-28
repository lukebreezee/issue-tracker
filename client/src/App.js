import { Login } from './components/Auth/Login';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Notifs } from './components/Notifs';
import { Account } from './components/Account';
import { Create } from './components/Auth/Create';
import { TeamLogin } from './components/Auth/TeamLogin';
import { CreateTeam } from './components/Auth/CreateTeam';
import { MembersAdmin } from './components/Members/MembersAdmin';
import { MembersPmDev } from './components/Members/MembersPmDev';
import { TicketsAdminPm } from './components/Tickets/TicketsAdminPm';
import { TicketsDev } from './components/Tickets/TicketsDev';
import { ProjectsAdminPm } from './components/Projects/ProjectsAdminPm';
import { ProjectsDev } from './components/Projects/ProjectsDev';
import { CreateProject } from './components/Projects/CreateProject';
import { ViewProject } from './components/Projects/ViewProject';
import { NewTicket } from './components/Tickets/NewTicket';
import { GithubRegister } from './components/Auth/GitHubRegister';
import { ViewTicket } from './components/Tickets/ViewTicket';
import { GithubLogin } from './components/Auth/GithubLogin';
import { ChangeEmail } from './components/Auth/ChangeEmail';
import { ChangePassword } from './components/Auth/ChangePassword';

import { mapCredentials } from './redux/mapToProps.js';

import { getTeamInfo } from './helpers';

import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleRegister } from './components/Auth/GoogleRegister';

const AppComponent = props => {

  let location = useLocation();

  let history = useHistory();

  useEffect(() => {
        
    if (
      
      !props.userInfo.username
      && /\/register|\/login\/github/.test(location.pathname) === false

    ) {
  
      history.push('/login');
  
    } else if (
      
        !props.userInfo.teamUsername
        && location.pathname !== '/create-team'
        && /\/register|\/login/.test(location.pathname) === false

      ) {
  
          history.push('/team-login');
  
    }

    let parent = document.getElementById('app');

    switch(location.pathname) {

      case '/tickets-admin-pm':

        parent.style.height = '150vh';

        break;

      case '/notifs':

        if (!props.userInfo.username || !props.userInfo.teamUsername) {

          history.push('/login');

          break;

        }

        const notifCount = props.userInfo.notifications.length;

        if (notifCount < 6) {

          parent.style.height = '100vh';

          break;

        };

        const pageHeight = ((notifCount - 5) * 12 + 100).toString();

        parent.style.height = `${pageHeight}vh`;

        break;

      case '/create-project':
      case '/view-ticket':
      case '/members-admin':

        if (window.innerWidth > 700) break;

        parent.style.height = '150vh';

        break;

      case '/view-project':
      case '/new-ticket':

        if (window.innerWidth > 700) break;

        parent.style.height = '130vh';

        break;

      default:

        parent.style.height = '100vh';

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, location.pathname]);

useEffect(() => {

    getTeamInfo();

}, [location.pathname]);


  return (

    <div id="app">

        <Navbar />

          <div id="parent-div">

            <Switch>

              <Route path="/" component={Dashboard} exact />

              <Route path="/register" component={Create} exact/>

              <Route path="/login" component={Login} exact />

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

              <Route path="/view-ticket" component={ViewTicket} />

              <Route path="/register/github" component={GithubRegister} />

              <Route path="/login/github" component={GithubLogin} />

              <Route path="/register/google" component={GoogleRegister} />

              <Route path="/change-email" component={ChangeEmail} />

              <Route path="/change-password" component={ChangePassword} />

            </Switch>

          </div>

      </div>    

  );
  
}

const App = connect(mapCredentials)(AppComponent);

export default App;