/** @jsx React.DOM */

var React = require('react');
var store = require('./modules/store');
var presistence = require('datalayer-indexeddb');

var Projects = require('./components/projects');
var Tasks = require('./components/tasks');
var Task = require('./components/task');
var Output = require('./components/output');

var Gobble = React.createClass({

  /* LOGIC */

  projectSelect: function (project) {
    this.setState({ projects: { selected: project }});
  },

  taskSelect: function (task) {
    this.setState({ tasks: { selected: task }});
  },

  output: function (message) {
    this.setState({ output: message });
  },

  /* LIFECYCLE EVENTS */

  getInitialState: function () {
    return {
      projects: { selected: undefined },
      tasks: { selected: undefined },
    };
  },

  /* RENDER */

  render: function () {
    return (
      <div class='gobble'>
        <h1>Gobble</h1>
        <hr />
        <Projects onSelect={this.projectSelect} />
        <hr />
        <Tasks onSelect={this.taskSelect} project={this.state.projects.selected} onOutput={this.output}/>
        <hr />
        <Task task={this.state.tasks.selected} />
        <hr />
        <Output output={this.state.output} />
      </div>
    ); 
  },

});

presistence('gobble', store, function () {
  React.renderComponent(<Gobble />, document.querySelector('.app'));
});
