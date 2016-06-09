var React = require("react");
var TaskLine = require("./taskLine");

var TaskList = React.createClass({

  openDetail: function (id) {
    this.props.openDetail(id);
  },


  render: function() {
    var filter = this.props.filter;
    var comp = this;
    var tasks = this.props.tasks || [];
    return (
      <ul className="task-list">
        {tasks.filter(filter).map(function (task){
          var selected = this.props.selectedTask === task.id ? " selected" : "";
          return (
            <li key={task.id} onClick={comp.openDetail.bind(comp, task.id)} className={"task-list-item" + selected}>
              <TaskLine task={task} seopenDetail={comp.openDetail} />
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
