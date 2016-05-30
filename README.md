# Prevoir

[Heroku link][prevoir] **NB:** This should be a link to your production site

[prevoir]: http://prevoir.herokuapp.com

## Minimum Viable Product

Prevoir is a web application inspired by Asana that will be built on Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an Asana-inspired site: workspaces, projects, tasks and comments.
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](https://github.com/appacademy/sample-project-proposal/blob/master/docs/production_readme.md) -- you'll write this later) -->

## Product Goals and Priorities

Prevoir will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create and edit workspaces (teams)
- [ ] Add members to workspaces
- [ ] Create, read, edit, and delete projects (MVP)
- [ ] Create, read, edit, and delete tasks (MVP)
- [ ] Add tasks to projects or workspaces (MVP)
- [ ] Set due-dates for and assign tasks to team members (MVP)
- [ ] Make and delete comments on tasks. (MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (1 day)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User`, `WorkSpace` and `TeamMembership` models
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after sign-in
- [ ] initialize user with Workspace
- [ ] account confirmation emails

### Phase 2: Project and Tasks Models, API, and basic APIUtil (1.5 days)

**Objective:** Workspaces and tasks can be created, read, edited and destroyed through
the API.

- [ ] create `Task` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for workspaces and tasks
- [ ] jBuilder views for above
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Workspaces, projects and tasks can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement the following components, building out the flux loop as needed.
  - [ ] `Splash`
  - [ ] `Top Bar`
  - [ ] `Side Bar`
  - [ ] `Workspace Home`
  - [ ] `Task Detail`
- [ ] save Tasks to the DB when the the user hits enter in the textarea

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Projects (.5 days)

**Objective:** Tasks belong to Projects, and can be viewed by Project.

- [ ] create `Project` model
- build out API, Flux loop, and components for:
  - view all projects for workspaces
  - [ ] Projects CRUD
  - [ ] view tasks by project
- Use CSS to style new views


### Phase 6: Add new members to team (0.5 days)

**Objective:** Users can invite other members to join their team

- build out API, Flux loop, and components for:
  - [ ] adding new users to workspaces
- [ ] Style new elements

### Phase 7: Add due dates and assignments to tasks (1 day)

**Objective:** Users can assign tasks to other members of their teams and set due-dates

- build out API, Flux loop, and components for:
  - [ ] adding new users to workspaces
- [ ] Style new elements

### Phase 8: Add comments (1 day)

**Objective:** Users can make and delete comments on tasks in their workspaces

- build out API, Flux loop, and components for:
  - [ ] adding and deleting comments
- [ ] Style new elements

### Phase 8: Styling Cleanup and Seeding (2 days)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Possible Bonus Features (TBD)
- [ ] Team-member permissions
- [ ] Email notifications
- [ ] Instant Search for Tasks and Projects
- [ ] Color-code projects
- [ ] Calendar view
- [ ] Subtasks

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
