
import './App.css';
import React from 'react';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
  // Link,
} from "react-router-dom";
import Hero from './components/Hero';
import LowerHero from './components/lowerHero';
import Home from './components/Home';

class App extends React.Component {

  // state = {
  //   foo: false,
  // };
//   componentWillUnmount() {
//     window.removeEventListener('scroll', this.handleScroll);
// }

  componentDidMount() {
   // console.log('componentDidMount() lifecycle');
  //  window.addEventListener('scroll', this.handleScroll);
  // this.makeAPICall();
    // Trigger update
    // this.setState({ foo: !this.state.foo });
  }

//   handleScroll(event : any) {
//     let scrollTop = event.srcElement.body.scrollTop,
//         itemTranslate = Math.min(0, scrollTop/3 - 60);

//     this.setState({
//       transform: itemTranslate
//     });
// }
  // makeAPICall = async () => {
  // try {
  //   const response = await fetch('http://localhost:3000/auth/login/42', {mode:'cors'});
  //   const data = await response.json();
  //   console.log({ data })
  // }
  // catch (e) {
  //   console.log(e)
  // }
  // }

  render() {
    console.log('Render lifecycle')
    return (
          <>
              <Router>
              <Routes>
                  <Route path='/' element={<><Header/><Hero/> <LowerHero/> </>}>
                  </Route>
                  <Route path='/channels' element={<> <Home/></>}>
                  </Route>
                  <Route path='/channels/:' element={<> </>}>
                  </Route>
              </Routes>
              </Router>
            </>
    );
  }
}

// const App: React.FC = () => {

//   componentDidMount() {
//     console.log('componentDidMount() lifecycle');

//     // Trigger update
//     this.setState({ foo: !this.state.foo });
//   }
// // function App() {
//   return (
//     <>
//         <Router>
//         <Routes>
//             <Route path='/' element={<><Header/><Hero/> <LowerHero/> </>}>
//             </Route>
//             <Route path='/channels' element={<> <Home/></>}>
//             </Route>
//             <Route path='/channels/:id' element={<> </>}>
//             </Route>
//         </Routes>
//         </Router>
//       </>
//     // <div>
//   );
// };


// const App: React.FC  {
//   return (
//     <Router>
//     <Routes>
//         <Route exact path='/' element={<><Header/><Hero/> <LowerHero/> </>}>
//         </Route>
//     </Routes>
//     </Router>
// // <div>
// );

// }
export default App;
 