var React = require("react");
var TaskLine = require("./taskLine");

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
          return (
            <li key={task.id} onClick={comp.openDetail.bind(comp, task.id)} className="task-list-item ">
              <TaskLine task={task} openDetail={comp.openDetail} />
            </li>) ;
        })}
        <li className="new-task-item">
          <a href="javascript:void(0)" onClick={this.props.addTask}></a>
        </li>
      </ul>
    );
  }

});

module.exports = TaskList;
