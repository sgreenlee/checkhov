# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Workspaces

- `GET /api/workspaces`
- `POST /api/workspaces`
- `GET /api/workspaces/:id`
- `PATCH /api/workspaces/:id`

### Tasks

- `GET /api/workspaces/:workspaceId/tasks`
  - index of all tasks for a workspace
- `POST /api/workspaces/:workspaceId/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Projects

- `GET /api/workspaces/:workspaceId/projects`
  - index of all projects for a workspace
- `POST /api/workspaces/:workspaceId/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id`

### Workspace Memberships
- `GET /api/workspaces/:workspaceId/members`
  - index of all members of a workspace
- `POST /api/workspaces/:workspaceId/members`
  - endpoint for adding new members

### Comments
- `GET api/tasks/:taskId/comments`
  - index of all comments for a task
- `POST api/tasks/:taskId/comments`
  - create new comment for task
- `DELETE api/comments/:id`
  - delete comment
