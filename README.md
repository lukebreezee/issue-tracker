# star-trak

Technologies Used:

  - React & Redux
  - Node.js & Express
  - MongoDB & Mongoose
  - JavaScript, not TypeScript (If I could do it over, I would probably use TypeScript)

Description:

  An all-purpose issue tracker/bug tracker for developers, project managers, and administrators.
  Once a user creates an account, they are prompted to either log into or create a team. These teams are
  made up of members and each member is has one of three roles - as mentioned before, the roles are
  dev, project manager, and admin (in ascending order of capability). Admins and PMs can create projects
  and assign these projects to developers and other admins/PMs. A project in this case is essentially
  a collection of tickets, or problems that occur within the project. These tickets can be assigned to any
  user who is assigned to the project. Only the creator of the project can create a ticket. Tickets start
  out with a status of 'Not Started' and can be changed to 'In Progress' or 'Finished' at any time.
  
Features:

  - OAuth system (User can log in/create an account with google and github)
  
  - Traditional auth system with email and password (using the passport library)
  
  - Caching system: User information is stored locally on their device to 
  
  eliminate the need to log in every time they visit the site.
  
  - Notifications: A user is pushed a notification whenever...
  
    - They are assigned to a new project
    - They are assigned to new ticket
    - A comment has been made on a ticket that the user
    is associated with (either creator or assigned member)
    - The status of a ticket that the user is associated with 
    has changed
    
  - Mobile-responsive: Navigation bar changes from tabs to a dropdown when the
  
  screen width is less then 700px, flexbox direction changes from row to column.
  
  - Simple routing: React router
  
  - Authorization: Admins can do everything that PMs and devs can do. On top of that,
  
  they have access to tickets that they are not associated with and they can manage
  
  role assignment. When a user creates a team, they are automatically made admin. There can be more
  
  than one admin. PMs can do everything that devs can do, plus create projects and tickets.
  
  Devs can make comments on tickets and change their progress.
  
  - User can edit account to change their first/last name, email, or password.
  
  - Passwords are hashed using the bcrypt library for security
  
  - CORS on the back-end prevents any other web address from querying the API that is not
  
  that of the client.
    
    
