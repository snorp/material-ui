var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/date-time.js');
var DayButton = require('./day-button.jsx');

var CalendarMonth = React.createClass({

  mixins: [Classable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired
  },

  render: function() {
    var classes = this.getClasses('mui-date-picker-calendar-month');

    return (
      <div className={classes}>
        {this._getWeekElements()}
      </div>
    );
  },

  _getWeekElements: function() {
    var weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map(function(week) {
      return (
        <div className="mui-date-picker-calendar-month-week">
          {this._getDayElements(week)}
        </div>
      );
    }, this);
  },

  _getDayElements: function(week) {
    return week.map(function(day) {
      var selected = DateTime.isEqualDate(this.props.selectedDate, day);
      return (
        <DayButton
          date={day}
          onTouchTap={this._handleDayTouchTap}
          selected={selected} />
      );
    }, this);
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  }

});

module.exports = CalendarMonth;