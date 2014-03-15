/** @jsx React.DOM */

var React = require('react');

var Output = React.createClass({

  /* LOGIC */

  /* LIFECYCLE EVENTS */

  componentWillReceiveProps: function (props) {

    if (typeof props.output === 'undefined') {
      return;
    }

    this.setState({ output: props.output + '\n' + this.state.output });
  },

  getInitialState: function () {
    return {
      output: ''
    };
  },


  /* RENDER */

  render: function () {
    return (
      <div class='output' style={{ display: this.state.output === '' ? 'none' : 'block' }}>
        <h2>Output</h2>
        <pre style={{ height: 200, 'overflow-y': 'scroll' }}>
          {this.state.output}
        </pre>
      </div>
    );
  },

});

module.exports = Output;
