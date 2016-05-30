```jsx
<Route path="/" component={App}>
  <IndexRoute component={Splash} />
  <Route path=":workspaceId" component={Workspace}>
    <IndexRedirect to="all" />
    <Route path=":projectId" component={Project}>
      <Route path=":taskId" component={TaskDetail}
    </Route>
    <Route path="all" component={WorkspaceHome}>
      <Route path=":taskId" component={TaskDetail}
    </Route>
  </Route>
</Route>
```
