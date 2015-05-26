var React = require('react');

module.exports = React.createClass({

  getInitalState: function() {
    return {
      locationOne: "",
      locationTwo: ""
    };
  },

  changeLocationOne: function(e) {
    var loc = e.target.value;
    this.setState({locationOne: loc});
  },

  changeLocationTwo: function(e) {
    var loc = e.target.value;
    this.setState({locationTwo: loc});
  },

  handleClick: function(e) {
    e.preventDefault();
    console.log(this.state.locationOne, this.state.locationTwo);
  },

  render: function() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <form className='form-horizontal'>

              <div className='form-group'>
                <label className='col-md-2 control-label'
                  htmlFor='location-one-input'>
                  Your Location</label>
                <div className='col-md-4'>
                  <input type="text"
                    onChange={this.changeLocationOne}
                    id='location-one-input'
                    className='form-control' />
                </div>
              </div>

              <div className='form-group'>
                <label className='col-md-2 control-label'
                  htmlFor='location-one-input'>
                  Their Location</label>
                <div className='col-md-4'>
                  <input type="text"
                    onChange={this.changeLocationTwo}
                    id='location-one-input'
                    className='form-control' />
                </div>
              </div>

              <div className='form-group'>
                <div className='col-sm-12'>
                  <button onClick={this.handleClick} type='submit' className='btn btn-default'>Go!</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }

});
