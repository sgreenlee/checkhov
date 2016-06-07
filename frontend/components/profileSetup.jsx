var React = require("react");
var SessionStore = require("../stores/sessionStore");
var UserActions = require("../actions/userActions");

var ProfileSetup = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var user = SessionStore.getCurrentUser() || {};
    return {first: "", last: "", email: user.email, avatarFile: ""};
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(this.onResponse);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onSubmit: function (e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("user[first_name]", this.state.first);
    formData.append("user[last_name]", this.state.last);
    formData.append("user[avatar]", this.state.avatarFile);
    UserActions.updateProfile(formData);
  },

  onResponse: function () {
    this.context.router.push("/setup/team");

  },

  firstChange: function (e) {
    this.setState({first: e.target.value});
  },

  lastChange: function (e) {
    this.setState({last: e.target.value});
  },

  updateAvatar: function (e) {
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState( {avatarFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) fileReader.readAsDataURL(file);
  },

  render: function() {
    var avatarImage;
    if (this.state.imageUrl) {
      avatarImage = <img width="250" height="250" src={this.state.imageUrl} ></img>;
    }
    return (
      <div>
        <h3>Please start by completing your profile.</h3>
        <form onSubmit={this.onSubmit}>

          <label htmlFor="first">First Name</label>
            <input id="first" type="text" onChange={this.firstChange} value={this.state.first} placeholder="First"/>

          <label htmlFor="last">Last Name</label>
          <input id="last" type="text" onChange={this.lastChange} value={this.state.last} placeholder="Last"/>

          <label htmlFor="email">Email</label>
            <input type="text" disabled="true" value={this.state.email} />


          <div className="avatar-frame">
            { avatarImage ? avatarImage : "Add Photo" }
            <input type="file" onChange={this.updateAvatar}/>
          </div>
          <input type="submit" value="Continue"/>
        </form>
      </div>
    );
  }

});

module.exports = ProfileSetup;
