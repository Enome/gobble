/** @jsx React.DOM */

var React = require('react');
var fs = window.req('fs');
var npm = window.req('npm');

var Projects = React.createClass({

  /* CUSTOM METHODS */

  readDir: function () {

    /*

    fs.readdir(this.state.project_new_name, function () {
      //console.log(arguments); 
    });
    */

    var self = this;

    npm.load({}, function (error) {

      console.log(error);

      npm.commands.install(self.state.project.path, [self.state.pkg], function (error, data) {
        console.log(error, data); 
      });

    });

    npm.on('log', function (message) {
      console.log('log', message); 
    });

    npm.on('data', function () {
      console.log('data', arguments); 
    });

  },

  /* UI LOGIC */

  updateProjectNewName: function (event) {
    this.setState({ pkg: event.target.value });
  },

  /* LIFECYCLE EVENTS */

  getInitialState: function () {

    return {
      project: { 
        path: 'C:\\Users\\fs\\Desktop\\gobble' 
      },
      pkg: ''
    };

  },

  /* RENDER */

  render: function () {

    return (
      <div class='projects'>
        <h1>Projects</h1>

        <div class='form-group'>
          <label>Project Name</label>
          <input type='text' value={this.state.pkg} onChange={this.updateProjectNewName}/>
        </div>

        <div class='form-group'>
          <button onClick={this.readDir}>Read</button>
        </div>

      </div>
    );
  },

});

module.exports = Projects;
