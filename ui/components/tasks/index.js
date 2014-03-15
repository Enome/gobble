/** @jsx React.DOM */

var React = require('react');
var store = require('../../modules/store');
var utils = window.nodeRequire('modules/utils');
var npm = window.nodeRequire('modules/npm');
var gulp = window.nodeRequire('modules/gulp');

var Task = React.createClass({

  /* LOGIC */

  add: function () {
    store.add('task', { 
      name: this.refs.name.getDOMNode().value,
      project_id: this.props.project._id,
    });
    
    this.setState({ tasks: this.projectTasks(this.props.project) });
  },

  remove: function (task) {
    store.remove('task', task._id);
    this.setState(this.getInitialState());
  },

  select: function (task) {
    this.props.onSelect(task);
  },

  generateTaskData: function (task) {

    var tasks = store.findAll('task').filter(function (t) {
      return task.project_id === t.project_id;
    });

    tasks = tasks.map(function (t) {

      t.streams = store.findAll('stream').filter(function (stream) {
        return stream.task_id === t._id;        
      }).sort(function (a, b) {
        return a.order > b.order; 
      });

      t.tasks = [];

      return t;
      
    });

    return tasks;
    
  },

  play: function (task) {

    var self = this;
    var data = this.generateTaskData(task);

    this.props.onOutput('Running task ' + task.name);

    var modules = utils.collectModulesFromTasks(data);

    this.props.onOutput('Installing modules from npm');

    var install = npm.install(this.props.project.path, modules);

    install.on('log', function (message) {
      self.props.onOutput(message);
    });

    install.on('end', function () {

      self.props.onOutput('Done doing npm stuff');
      gulp.generate(self.props.project.path, data);
      self.props.onOutput('Generated Gulpfile.js');

      var run = gulp.run(self.props.project.path, task.name);
      run.on('log', self.props.onOutput);

      run.on('end', function () {
        self.props.onOutput('Done running gulp task');
      });

    });
    
  },

  projectTasks: function (project) {
    return store.findAll('task').filter(function (task) {
      return task.project_id === project._id; 
    });
  },


  /* LIFECYCLE EVENTS */

  componentWillReceiveProps: function (props) {
    this.setState({ tasks: this.projectTasks(props.project) });
  },
  
  getDefaultProps: function () {
    return {
      project: { path: '', _id: '' },
    };
  },

  getInitialState: function () {
    return {
      tasks: this.projectTasks(this.props.project)
    };
  },


  /* RENDER */

  render: function () {

    var self = this;

    var tasks = this.state.tasks.map(function (task) {
      return (
        <li>
          {task.name}
          <button onClick={self.select.bind(null, task)}>Select</button>
          <button onClick={self.remove.bind(null, task)}>Remove</button>
          <button onClick={self.play.bind(null, task)}>Play this task</button>
        </li>
      );
    });

    return (
      <div class='tasks' style={{ display: this.props.project._id === '' ? 'none' : 'block' }}>
        <h2>Tasks: {this.props.project.path}</h2>
        <input type='text' ref='name' placeholder='task name'/>
        <button onClick={this.add}>add</button>
        <ul>{tasks}</ul>
      </div>
    );
  },

});

module.exports = Task;
