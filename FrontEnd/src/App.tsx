
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
import Callback from './components/auth/42/callback';
import EditProfile from './components/EditProfile';


class App extends React.Component {


  componentDidMount() {

  }


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
                  <Route path='/callback' element={<> <Callback/> </>} >
                  </Route>
                  <Route path='/EditInfo' element={<> <EditProfile/> </>} >
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
 