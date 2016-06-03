var React = require("react");
var TaskListItem = require("./taskListItem");

var TaskList = React.createClass({

  openDetail: function (id) {
    this.props.openDetail(id);
  },


  render: function() {
    var comp = this;
    var tasks = this.props.tasks || [];
    return (
      <ul className="task-list">
        {tasks.map(function (task){
          return <TaskListItem task={task} key={task.id} openDetail={comp.openDetail} />
        })}
      </ul>
    )
  }

});

module.exports = TaskList;
