# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Workspace cycles

* `fetchAllWorkSpaces`
  0. invoked from `Splash` `didMount`
  0. `GET /api/workspaces` is called
  0 `receiveAllWorkSpaces` is set as the callback.

* `createWorkSpace`
  0. invoked from NewWorkSpace form onSubmit
  0. `POST /api/workspaces` is called.
  0. `receiveSingleWorkSpace` is set as the callback.

* `fetchSingleWorkSpace`
  0. invoked from `Top Bar` account dropdown and `Splash` `didMount`
  0. `GET /api/workspaces/:id` is called.
  0. `receiveSingleWorkSpace` is set as the callback.

* `updateWorkSpace`
  0. invoked from `EditWorkSpaceForm` `onSubmit`
  0. `PATCH /api/workspaces/:id` is called.
  0. `receiveSingleWorkSpace` is set as the callback.

### WorkSpace API Response Actions

* `receiveAllWorkSpaces`
  0. invoked from an API callback.
  0. `WorkSpace` store updates `_workSpaces` and emits change.

* `receiveSingleWorkSpace`
  0. invoked from an API callback.
  0. `WorkSpace` store updates `_workSpaces[id]` and emits change.

### Store Listeners

* `WorkSpace` component listens to `WorkSpace` store.

## Project cycles

### Projects API Request Actions

* `fetchAllProjects`
  0. invoked from `WorkSpace` `didMount`/`willReceiveProps`
  0. `GET /api/workspaces/:workspaceId/projects` is called.
  0. `receiveAllProjects` is set as the callback.

* `createProject`
  0. invoked from new project button `onClick`
  0. `POST /api/workspaces` is called.
  0. `receiveSingleProject` is set as the callback.

* `fetchSingleProject`
  0. invoked from `Project` `didMount`/`willReceiveProps`
  0. `GET /api/projects/:id` is called.
  0. `receiveSingleProject` is set as the callback.

* `updateProject`
  0. invoked from `ProjectForm` `onSubmit`
  0. `PATCH /api/projects/:id` is called.
  0. `receiveSingleProject` is set as the callback.

* `destroyProject`
  0. invoked from delete project button `onClick`
  0. `DELETE /api/projects/:id` is called.
  0. `removeProject` is set as the callback.

### Projects API Response Actions

* `receiveAllProjects`
  0. invoked from an API callback.
  0. `Project` store updates `_projects` and emits change.

* `receiveSingleProject`
  0. invoked from an API callback.
  0. `Project` store updates `_projects[id]` and emits change.

* `removeProject`
  0. invoked from an API callback.
  0. `Project` store removes `_projects[id]` and emits change.

### Store Listeners

* `ProjectsIndex` component listens to `Project` store.

## Task cycles

### Tasks API Request Actions

* `fetchAllTasks`
  0. invoked from `WorkSpace` `didMount`/`willReceiveProps`
  0. `GET /api/workspaces/:workspaceId/tasks` is called.
  0. `receiveAllTasks` is set as the callback.

* `createTask`
  0. invoked from many different places
  0. `POST /api/workspaces` is called.
  0. `receiveSingleTask` is set as the callback.

* `fetchSingleTask`
  0. invoked from `TaskDetail` `didMount`/`willReceiveProps`
  0. `GET /api/tasks/:id` is called.
  0. `receiveSingleTask` is set as the callback.

* `updateTask`
  0. invoked from `TaskForm` `onSubmit`
  0. `PATCH /api/tasks/:id` is called.
  0. `receiveSingleTask` is set as the callback.

* `destroyTask`
  0. invoked from delete task button `onClick`
  0. `DELETE /api/tasks/:id` is called.
  0. `removeTask` is set as the callback.

### Tasks API Response Actions

* `receiveAllTasks`
  0. invoked from an API callback.
  0. `Task` store updates `_tasks` and emits change.

* `receiveSingleTask`
  0. invoked from an API callback.
  0. `Task` store updates `_tasks[projectId][taskId]` and emits change.

* `removeTask`
  0. invoked from an API callback.
  0. `Task` store removes `_tasks[projectId][id]` and emits change.

### Store Listeners

* `WorkSpaceHome` and `Project` components listens to `Task` store.

## Comment cycles

### Comments API Request Actions

* `fetchAllComments`
  0. invoked from `TaskDetail` `didMount`/`willReceiveProps`
  0. `GET /api/workspaces/:workspaceId/tasks` is called.
  0. `receiveAllComments` is set as the callback.

* `createComment`
  0. invoked from New Comment Form onSubmit
  0. `POST /api/workspaces` is called.
  0. `receiveSingleComment` is set as the callback.

* `destroyComment`
  0. invoked from delete comment button `onClick`
  0. `DELETE /api/tasks/:id` is called.
  0. `removeComment` is set as the callback.

### Comments API Response Actions

* `receiveAllComments`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments` and emits change.

* `removeComment`
  0. invoked from an API callback.
  0. `Comment` store removes `_comments[projectId][id]` and emits change.

### Store Listeners

* `CommentsIndex` components listens to `Comment` store.
