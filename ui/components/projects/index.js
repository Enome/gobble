/** @jsx React.DOM */

var React = require('react');
var store = require('../../modules/store');

var Projects = React.createClass({

  /* LOGIC */

  add: function () {
    store.add('project', { path: this.refs.path.getDOMNode().value });
    this.setState(this.getInitialState());
  },

  remove: function (project) {
    store.remove('project', project._id);
    this.setState(this.getInitialState());
  },

  select: function (project) {
    this.props.onSelect(project);
  },


  /* LIFECYCLE EVENTS */

  getInitialState: function () {
    return {
      path: '',
      projects: store.findAll('project'),
    };
  },


  /* RENDER */

  render: function () {

    var self = this;

    var projects = this.state.projects.map(function (project) {
      return (
        <li>
          {project.path}
          <button onClick={self.select.bind(null, project)}>Select</button>
          <button onClick={self.remove.bind(null, project)}>Remove</button>
        </li> 
      );
    });

    return (
      <div class='projects'>

        <h2>Projects</h2>

        <input type='text' ref='path' placeholder='Directory' />
        <button onClick={this.add.bind(null, this.state.path)}>Add</button>

        <ul>
          {projects}
        </ul>

      </div> 
    );
  },

});

module.exports = Projects;
