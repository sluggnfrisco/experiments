/*

https://facebook.github.io/react/docs/reconciliation.html#list-wise-diff

For the diffs algorithm: keys are helpful!

Setting a key lets React keep a hash of which elements are existing on the page, ie. if you input an element at the front of a list, it will go into mutation mode unless you specify a key. With a key, it won't separately replace each element with what was before it, but will know all but 1 item is already pre-existing on the page.

In order to do children reconciliation, React adopts a very naive approach. It goes over both lists of children at the same time and generates a mutation whenever there's a difference.

*/

var AutoCompleter = React.createClass({
  getInitialState: function() {
    return { searchQuery: '' };
  },

  // componentDidMount: function() {},
  // componentWillUnmount: function() {},

  handleChange: function(e) {
    this.setState({
      searchQuery: e.currentTarget.value,
      function() {}           // can take a callback!
    });

    //NOTE REM: this.state.attribute    NOT this.attribute
    // console.log(this.state.searchQuery);  // still unchanged -- setState is asynchronous
  },

  render: function() {
    var filteredThings = this.props.things.filter(function(thing) {
      return thing.name.match(this.state.searchQuery);
    }.bind(this));
    // debugger;
    // console.log(this.searchQuery);

    return (
      <div className='user-searchbox'>
        <input type='text'
               value={this.state.searchQuery}
               onChange={this.handleChange}>
        </input>
        <ul> Things {       // can't have semicolons, dropped in directly!
          filteredThings.map( function(thing) {
            return (
              //QUESTION: is this right way? establishing ID later?
              //QUESTION: why don't have to bind handleChange?
              <li key={thing.id}>
                {thing.name}
              </li>  //NOTE: add onChange
            );
          }.bind(this))
          // [
          //   <li>{this.props.things[0].name}</li>,
          //   <li>{this.props.things[1].name}</li>,
          //   <li>{this.props.things[2].name}</li>
          // ]
        }
        </ul>
      </div>
    );
  },
});

var Thing = function(id, name, price) {
  this.id = id;
  this.name = name;
  this.price = price;
};

var things = [
  new Thing(1, 'teddy', 10),
  new Thing(2, 'toy soldier', 1),
  new Thing(3, 'dollhouse', 30)
];

React.render(
  <AutoCompleter things={things}></AutoCompleter>,
  document.getElementById('autocomplete')
);
