var React = require("react");
var TeamStore = require("../stores/teamStore");
var TeamActions = require("../actions/teamActions");
var TeamMemberActions = require("../actions/teamMemberActions");
var TeamMemberStore = require("../stores/teamMemberStore");
var ProjectStore = require("../stores/projectStore");
var TeamProjectList = require("./teamProjectList");
var TeamMemberList = require("./teamMemberList");
var ProjectActions = require("../actions/projectActions");

var TeamHome = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var team = TeamStore.find(this.props.params.teamId) || {};
    var members;
    var projects;
    if (TeamMemberStore.getCurrentTeam() === team.id) {
      members = TeamMemberStore.all();
    }
    if (ProjectStore.getCurrentTeam() === team.id) {
      projects = ProjectStore.all();
    }
    return {
      team: team,
      members: members,
      projects: projects
    };
  },

  componentWillReceiveProps: function (props) {
    var team = TeamStore.find(props.params.teamId) || {};
    this.setState({team: team, members: [], projects: []});
    TeamMemberActions.fetchMembers(props.params.teamId);
    ProjectActions.fetchProjects(props.params.teamId);
  },

  componentDidMount: function () {
    this.teamListener = TeamStore.addListener(this.teamUpdate);
    this.membersListener = TeamMemberStore.addListener(this.teamMembersUpdate);
    this.projectsListener = ProjectStore.addListener(this.projectsUpdate);
    TeamActions.getTeam(this.props.params.teamId);
    TeamMemberActions.fetchMembers(this.props.params.teamId);
    ProjectActions.fetchProjects(this.props.params.teamId);
  },

  teamUpdate: function () {
    this.setState({team: TeamStore.find(this.props.params.teamId) || {} });
  },

  teamMembersUpdate: function () {
    if (TeamMemberStore.getCurrentTeam() === parseInt(this.props.params.teamId)) {
      this.setState({members: TeamMemberStore.all() });
    }
  },

  projectsUpdate: function () {
    if (ProjectStore.getCurrentTeam() === parseInt(this.props.params.teamId)) {
      this.setState({projects: ProjectStore.all() });
    }
  },

  createProject: function () {

  },

  newMember: function () {

  },

  render: function() {

    var projects = this.state.projects;
    var members = this.state.members;
    var team =this.state.team;

    return (
      <div id="team-home-component">
        <section id="teams-sidebar" className="clearfix">
          <h3>checkhov</h3>
          <TeamProjectList teamId={this.props.params.teamId} projects={projects} newProject={this.createProject} />
          <TeamMemberList teamId={this.props.params.teamId} members={members} newMember={this.addMember}/>
        </section>
        <section id="teams-main" className="clearfix">
          <header id="top-bar">
            <nav id="team-nav">
              <a href="javascrip:void(0)">My Tasks</a>
              <a href="javascrip:void(0)">My Inbox</a>
              <a className="icon-dropdown" href="javascrip:void(0)"></a>
            </nav>
            <nav id="search"></nav>
            <nav id="account-nav">
              <a className="account-dropdown" href="javascript:void(0)">{this.state.team.name}
                <span className="user-avatar"></span>
              </a>
            </nav>
          </header>
          {this.props.children && React.cloneElement(this.props.children, {team: this.state.team })}
        </section>
      </div>

    );
  }

});

module.exports = TeamHome;
