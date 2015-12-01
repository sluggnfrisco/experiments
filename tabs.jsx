var Tabs = React.createClass({
  getInitialState: function() {
    return({
      selectedIdx: null
    });
  },

  handleClick: function(idx) {
    console.log('called');
    console.log(idx);
    this.setState({ selectedIdx: idx });
  },

  render: function() {
    var selectedIdx = this.state.selectedIdx;
    var tabs = this.props.tabs;
    return (
      <div className='tabs'>
        <ul> Tabs Titles {        // NOTE REM you need to interpolate #map()!
          tabs.map( function(tab, idx) {
            var style = '';
            if (idx === selectedIdx) {
              style = 'bold';
            }
            return (
              // QUESTION: mess around with the 2 bindings belows
              <li className={style}
                  key={idx}
                  onClick={this.handleClick.bind(this, idx)}>{tab.title}</li>
            );
          }.bind(this))      // NOTE REM no semicolon!!
        }
        </ul>

        You cant do if-then cause they got brackets! Treats as interpolation

        // Must call content below... cant just print object to browser
        <p>{selectedIdx === null ? '' : tabs[selectedIdx].content}</p>
      </div>
    );
  },
});


var Tab = function(title, content) {
  this.title = title;
  this.content = content;
};

var tabs = [
  new Tab('first tab', 'first tab is greatest'),
  new Tab('second tab', 'second tab is coolest'),
  new Tab('third tab', 'third tab is warmest')
];

React.render(
  <Tabs tabs={tabs}></Tabs>,
  document.getElementById('tabs')
);
