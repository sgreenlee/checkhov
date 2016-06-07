var React = require("react");
var TaskActions = require("../actions/taskActions");

var DAYS_IN_MONTH = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31
};


var MONTH_NAMES = {
  1: "January",
  2: "Febuary",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

var TaskDueDateSetter = React.createClass({

  getInitialState: function() {
    var baseDate = this.props.task.due_date;
    baseDate = baseDate ? this.parseDueDate(baseDate) : new Date();
    var year = baseDate.getYear() + 1900;
    var month = baseDate.getMonth();
    var date = baseDate.getDate();
    var displayDate = {year: year, month: month};
    if (this.props.task.due_date) {
      return {
        dueDate: {year: year, month: month},
        displayDate: {year: year, month: month}
      };
    } else {
      return {
        dueDate: undefined,
        displayDate: {year: year, month: month}
      };
    }
  },

  componentDidMount: function () {
    window.addEventListener("click", this.pageClick);
  },

  componentWillUnmount: function () {
    window.removeEventListener("click", this.pageClick);
  },

  componentWillReceiveProps: function (props) {
    var baseDate = props.task.due_date;
    baseDate = baseDate ? this.parseDueDate(baseDate) : new Date();
    var year = baseDate.getYear() + 1900;
    var month = baseDate.getMonth();
    var date = baseDate.getDate();
    var displayDate = {year: year, month: month};
    if (props.task.due_date) {
      this.setState({
        dueDate: {year: year, month: month, date: date},
        displayDate: {year: year, month: month}
      });
    } else {
      this.setState({
        dueDate: undefined,
        displayDate: {year: year, month: month}
      });
    }
  },

  getNode: function(domNode) {
    this.domNode = domNode;
  },

  getUnassignNode: function (node) {
    this.unassignNode = node;
  },

  pageClick: function (e) {
    if (this.domNode.contains(e.target) && e.target !== this.unassignNode) {
      this.setState({expanded: true});
    } else if (this.state.expanded === true) {
      var dueDate = this.serializeDueDate();
      if (dueDate !== this.props.task.due_date) {
        this.setDueDate();
      }
      this.setState({expanded: false});
    }
  },

  parseDueDate: function (dueDateString) {
    if (!dueDateString) return undefined;
    var parts = dueDateString.split("-");
    return new Date(parts[0], parts[1], parts[2]);
  },

  formatDueDate: function() {
    if (!this.state.dueDate) return undefined;

    var date = this.state.dueDate.date;
    var month = this.state.dueDate.month;
    var year = this.state.dueDate.year;
    if (date && month && year) {
      if (date < 10) date = "0" + date;
      if (month < 10) month = "0" + month;
      return month + "/" + date + "/" + year;
    }
    return undefined;
  },

  unassign: function () {
    var task = Object.assign({}, this.props.task);
    task.due_date = null;
    TaskActions.updateTask(task);
  },

  setDueDate: function () {
    this.setState({expanded: false});
    var task = Object.assign({}, this.props.task);
    task.due_date = this.serializeDueDate();
    TaskActions.updateTask(task);
  },

  serializeDueDate: function () {
    if (!this.state.dueDate) return undefined;
    var dueDate = this.state.dueDate;
    var date = this.state.dueDate.date;
    var month = this.state.dueDate.month;
    var year = this.state.dueDate.year;
    if (date && month && year) {
      if (date < 10) date = "0" + date;
      if (month < 10) month = "0" + month;
      return year + "-" + month + "-" + date;
    }
    return null;
  },

  incrementMonth: function () {
    var month = this.state.displayDate.month + 1;
    var year = this.state.displayDate.year;
    if (month > 11) {
      month = 0;
      year++;
    }
    this.setState({displayDate: { month: month, year: year }});
  },

  decrementMonth: function () {
    var month = this.state.displayDate.month - 1;
    var year = this.state.displayDate.year;
    if (month < 0) {
      month = 11;
      year--;
    }
    this.setState({displayDate: { month: month, year: year }});
  },

  setDate: function (e) {
    var date = parseInt(e.target.innerHTML);
    var dueDate = this.state.displayDate;
    dueDate.date = date;
    this.setState({dueDate: dueDate});
  },

  render: function() {
    var comp = this;
    var formattedDueDate = this.formatDueDate();

    var className = this.state.expanded ? " expanded" : "";
    if (formattedDueDate) {
      className = className || " assigned";
    }

    // get number of days and number of blank spots in current display month
    var date = new Date(this.state.displayDate.year, this.state.displayDate.month - 1, 1);
    var nBlanks = date.getDay();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    var daysInMonth = date.getDate();

    var blanks = [];
    for (var i = 0; i < nBlanks; i++) {
      blanks.push(<div className="cal-blank" />);
    }

    var days = [];
    for (var j = 1; j <= daysInMonth; j++) {
      days.push(<div className="cal-day" onClick={this.setDate}>{j}</div>);
    }

    var dateString = MONTH_NAMES[date.getMonth() + 1] + ", " + (date.getYear() + 1900);

    var content;
    if (this.state.expanded) {
      content = (
        <div className={"due-date-setter expanded"} ref={this.getNode}>
          <div className="avatar"><i className="fa fa-calendar" aria-hidden="true"></i></div>
          <input value={formattedDueDate} type="text" placeholder="mm/dd/yyyy" />
          <div className="calendar">
            <div className="container">
              <div className="select-bar">
                <a className="left" onClick={this.decrementMonth}/>
                <p>{ dateString }</p>
                <a className="right" onClick={this.incrementMonth}/>
              </div>
              <div className="calendar-body clearfix">
                <div className="cal-header">Su</div>
                <div className="cal-header">Mo</div>
                <div className="cal-header">Tu</div>
                <div className="cal-header">We</div>
                <div className="cal-header">Th</div>
                <div className="cal-header">Fr</div>
                <div className="cal-header">Sa</div>
                { blanks }
                { days }
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <div className={"due-date-setter" + className} ref={this.getNode}>
          <div className="avatar"><i className="fa fa-calendar" aria-hidden="true"></i></div>
          <div className="unassign-button" ref={this.getUnassignNode} onClick={this.unassign}>
            <div className="tooltip" content="Unassign" />
          </div>
          <h6>{formattedDueDate || "Due Date"}</h6>
        </div>
      );

    }
    return content;
  }

});

module.exports = TaskDueDateSetter;
