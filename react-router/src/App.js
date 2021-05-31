import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Widgets from './components/Widgets';
import Wudgets from './components/Wudgets';

const widgetprods=[
  {name: 'Master Widget', price:'$125.00'},
  {name: 'Sub Widget', price:'$115.00'},
  {name: 'Long Widget', price:'$150.00'},
  {name: 'Short Widget', price:'$135.00'}
]

const wudgetprods=[
  {name: 'Master Wudget', price:'$75.00'},
  {name: 'Sub Wudget', price:'$85.00'},
  {name: 'Long Wudget', price:'$135.00'},
  {name: 'Short Wudget', price:'$110.00'}
]

const App =()=>{
  return (
    <Router>
      <div className='App'>
        <Navbar />   
        <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/widgets'
                render={(props)=>
                  <Fragment>
                    <Widgets prods={widgetprods}/>
                  </Fragment>
                }
              /> 
              <Route exact path='/wudgets'
                render={(props)=>
                  <Fragment>
                    <Wudgets prods={wudgetprods}/>
                  </Fragment>
              }
            />
            </Switch>
         </div>
      </div>
      </Router>
)};
export default App;