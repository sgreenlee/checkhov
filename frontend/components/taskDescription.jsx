var React = require("react");

var TaskDescription = React.createClass({

  getInitialState: function() {
    return {description: this.props.task.description};
  },

  componentWillReceiveProps: function(props) {
    console.log("receiving props");
    this.setState({description: props.task.description});
  },

  onChange: function(e) {
    this.setState({ description: e.target.value });
    this.setHeight();
  },

  setRef: function (component) {
      this.domNode = component;
  },

  setHeight: function () {
    $(this.domNode).css({'height':'auto','overflow-y':'hidden'}).height(this.domNode.scrollHeight);
  },

  render: function() {
    var task = this.props.task || {};
    return <textarea ref={this.setRef} className="task-description" onChange={this.onChange}
              onBlur={this.updateDescription} placeholder="Description" value={this.state.description} />;
  }

});

module.exports = TaskDescription;
