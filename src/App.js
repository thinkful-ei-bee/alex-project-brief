import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state={
    names:[]
  }

  handleSearch = event =>{
    event.preventDefault()
    const name =event.target['search-name-input'].value
    fetch(`https://swapi.co/api/people/?search=${name}`,{
      method:'GET',
      headers: new Headers({
        'Content-Type':`application/json`
      })
    })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      let ans=[]
      for(let i=0;i<data.results.length;i++){
        ans.push(data.results[i].name)
      }
      this.setState({
        names:ans
      })
      
    })
    .catch(error => {
      console.error(error)
    })

  }

  returnResults = outputNames =>{
    return (
      <ul>
        {outputNames.map(item =>{
          return <li>{item}</li>
          })
        }
      </ul>
    )
  }

  render() {
      const outputNames = this.state.names;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1> Star Wars</h1>
        <section className='Search'>
          <h2>Search up a character</h2>
          <form onSubmit={this.handleSearch}>
            <div className='field'>
              <label htmlFor='search-name-input'>
                  Search a character 
              </label>
              <input type='text' id='search-name-input'  />
            </div>
            <div className='buttons'>
              <button type='submit' >
                Search
              </button>
            </div>
          </form>
        </section>
        <section className = 'results'>
            {this.returnResults(outputNames)}
        </section>
      </div>
    );
  }
}

export default App;
