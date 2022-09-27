
// ! STATE AND LIFECYCLE

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Clock />);

  // 1 root.render will call the constructor of class Clock witch will set the state.date to a current time
   // * -> the componant will be rendered
   // * -> lead to call componentDidMount() starting lifecyle of calling tick every second and setting the state to new value
   // * -> the render method wll be called again cuz react knows the state has been changed.
   // * If the Clock component is ever removed from the DOM, React calls the componentWillUnmount() lifecycle method so the timer is stopped



   // ! the setState  is used to modify the state value  ( the assignement is used only in constructor)
            // ? // Wrong
                this.state.comment = 'Hello';
            // ?  Correct
                this.setState({comment: 'Hello'});

    // ! State Updates May Be Asynchronous
    // ? Wrong
            this.setState({
                counter: this.state.counter + this.props.increment,
              });

    // ? Correct   setState has a second form that takes function rather than an object
            this.setState((state, props) => ({
                counter: state.counter + props.increment
              }));

////////////////////////////////////////////////////////////////

// ! React events 

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

  // !!!!! To ensure the safety of (this) either use bind or arrow function as a methode or as a callback function
    // ?  // This syntax ensures `this` is bound within handleClick.
          handleClick = () => {
            console.log('this is:', this);
          };

    // ? or this

   // ? render() {
      // This syntax ensures `this` is bound within handleClick
      return (
        <button onClick={() => this.handleClick()}>
          Click me
        </button>
      );
        
// ! JWT 
        // * acces token  sent as json ,
            //* client stores in memory and not in local storage or a coockie
        
        
        // * refresh token sent as httpOnly coockie 
          // * Not accessible via JS
          // * Must have expiry at some point
      // ? both issued at authorization 


// ! Axios
        // * axios is HTTP libray or http client to make request either for you own backend or a third party api to fetch data
           //* its similar to fetch (built in wihtin the browser) 
