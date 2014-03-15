/** @jsx React.DOM */

var React = require('react');
var store = require('../../modules/store');

var Task = React.createClass({

  /* LOGIC */

  add: function (module) {

    store.add('stream', { 
      task_id: this.props.task._id,
      order: this.state.streams.length,
      module: module.name,
    });

    this.setState(this.getInitialState());

  },

  remove: function (stream) {
    store.remove('stream', stream._id);
    this.setState(this.getInitialState());
  },

  updateStreamCode: function (stream, event) {
    store.update('stream', stream._id, { code: event.target.value });
    this.setState(this.getInitialState());
  },

  taskStreams: function (task) {
    return store.findAll('stream').filter(function (stream) {
      return stream.task_id === task._id; 
    }).sort(function (a, b) {
      return a.order > b.order; 
    });
  },


  /* LIFECYCLE EVENTS */

  componentWillReceiveProps: function (props) {
    this.setState({streams: this.taskStreams(props.task) });
  },

  getDefaultProps: function () {
    return {
      task: { name: '', _id: '' },
    };
  },

  getInitialState: function () {
    return {
      modules: [
        { name: 'gulp.src' },
        { name: 'gulp.dest' },
      ],
      streams: this.taskStreams(this.props.task),
    };
  },


  /* RENDER */

  render: function () {

    var self = this;

    var modules = this.state.modules.map(function (module) {
      return (
        <li>
          {module.name}
          <button onClick={self.add.bind(null, module)}>Add to task</button>
        </li>
      ); 
    });

    var streams = this.state.streams.map(function (stream) {
      return (
        <li key={stream._id}>
          {stream.module}
          <textarea onBlur={self.updateStreamCode.bind(null, stream)} defaultValue={stream.code}></textarea>
          <button onClick={self.remove.bind(null, stream)}>Remove</button>
        </li>
      ); 
    });

    return (
      <div class='task' style={{ display: this.props.task._id === '' ? 'none' : 'block' }}>
        <h1>Task: {this.props.task.name}</h1>

        <h2>Available Streams</h2>
        <ul>{modules}</ul>

        <h2>Streams</h2>
        <ul>{streams}</ul>
      </div>
    );
  },

});

module.exports = Task;
