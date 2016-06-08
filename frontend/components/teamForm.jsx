var TeamStore = require("../stores/teamStore");
var React = require("react");
var TeamActions = require("../actions/teamActions");


var TeamForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this.listener = TeamStore.addListener(this.onResponse);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  getInitialState: function () {
    return {newTeamName: "", errors: [], open: false};
  },

  onResponse: function () {
    var errors = TeamStore.getErrors();
    if (errors.length != 0) {
      this.setState({ errors: errors });
    } else {
      var teamId = TeamStore.getCreatedTeamId();
      if (teamId) {
        this.setState({ newTeamName: "", open: false });
        this.context.router.push("/teams/" + teamId);
      }
    }
  },

  openModal: function (e) {
    e.preventDefault();
    this.setState({ open: true });
  },

  closeModal: function (e) {
    this.setState({ open: false, errors: [], newTeamName: "" });
  },

  onFormInput: function (e) {
    this.setState({newTeamName: e.target.value });
  },

  onSubmit: function (e) {
    e.preventDefault();
    TeamActions.createTeam({name: this.state.newTeamName});
  },


  render: function () {
    var open = this.state.open ? " open" : "";

    return (

      <div className="team-form-component">
        <a className="icon-dropdown" onClick={this.openModal}> New team</a>
        <div className={"new-team-modal-group modal-overlay" + open} onClick={this.closeModal}> </div>
          <div className={"new-team-modal-group modal" + open}>
            <h4>Create a new team</h4>
            <p>What should we call your new team?</p>
            <a className="x-icon close-modal" onClick={this.closeModal} />
            <form onSubmit={this.onSubmit} className="clearfix">
              <ul className="error-messages">
                {
                  (this.state.errors).map(function (error) {
                    return <li>{error}</li>;
                  })
                }
              </ul>
              <label htmlFor="new-member-email">Team Name</label>
              <input value={this.state.newTeamName} onChange={this.onFormInput} type="text" id="new-member-email" />
              <input type="submit" value="Create Team" />
            </form>
          </div>
      </div>

    )
  }
})

module.exports = TeamForm;
