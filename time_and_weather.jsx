var TimeAndWeather = React.createClass({
  render: function() {
    return (
      <div className='time-and-weather'>
        <Time></Time>
        <Weather></Weather>
      </div>
    );
  },
});

var Time = React.createClass({
  getInitialState: function() {
    return ({ currTime: new Date() });
  },

  // only increment after component is ON page
  componentDidMount: function() {
    // we store timeIntervalId directly on 'this' instead of the state, because it doesn't affect the UI
    this.timeIntervalId = setInterval(
      this.timeSlowlyPasses.bind(this), 1000
    );          // i bound the timeSlowlyPasses at first, then it said it didn't need...
    // QUESTION: React does auto-binding within a component
  },
  componentWillUnmount: function() {
    clearInterval(this.timeIntervalId);
  },

  timeSlowlyPasses: function() {
    this.setState({currTime: new Date()});
  },

  render: function() {
    // NOTE REM: must parse into string before JSX will put it on the page -- won't put the raw date object
    return (
      <div className='time'>{this.state.currTime.toString()}
      </div>
    );
  }
});

var Weather = React.createClass({
  getInitialState: function() {
    // var environment = require('application.json');
    // this.apiKey = JSON.parse(environment).weather_api_key;
    return ({ temperature: 0, description: '' });
  },

  componentDidMount: function() {
    var geo = navigator.geolocation;
    //QUESTION: need #bind here??
    var position = geo.getCurrentPosition(this.handleCurrPos.bind(this));
    this.apiKey = '645c5d39c7603f17e23fcaffcea1a3c1';
  },

  componentWillUnmount: function() {

  },

  handleCurrPos: function(position) {
    var coords = position.coords;
    var latitude = coords.latitude,
        longitude = coords.longitude;
    this.requestWeather(latitude, longitude);
  },

  // alternate way: http://youmightnotneedjquery.com/#request
  requestWeather: function(lat, long) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      // if request is finished...
      if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
        // if request came back 200OK...
        if(xmlhttp.status === 200){
          this.handleResponse(xmlhttp.responseText);
        } else {
          alert('something else other than 200 was returned');
        }
      }
    }.bind(this);  // need binding -- callbacks are invoked function-style

    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +
                '&lon=' + long +
                '&appid=' + this.apiKey;

    // boolean denotes asynch, else send() doesn't return til done
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  },

// void open(
//    DOMString method,
//    DOMString url,
//    optional boolean async,
//    optional DOMString user,
//    optional DOMString password
// );

  handleResponse: function(responseText) {
    var respObj = JSON.parse(responseText);
    this.setState({
      temperature: respObj.main.temp,
      description: respObj.weather[0].description,
    });
  },

  render: function() {
    return(
      <div className='weather'>
        <p>{this.state.temperature}</p>
        <p>{this.state.description}</p>
      </div>
    );
  }
});

React.render(
  <TimeAndWeather></TimeAndWeather>,
  document.getElementById('time-and-weather')
);
