import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    goal: '',
    gender: true,
    olyClass: false
  }
  roundGoal = (goal) => {
    //to nearest 5lb
    return goal % 5 < 2.5 ? goal - goal % 5 : goal + 5 - (goal % 5)
  }
  findSimplestWeights = (goal, current, olyClass, weights=[]) =>{
    let roundedGoal = this.roundGoal(goal)
    if(current === roundedGoal) return {goal, weights}
    else if(current < roundedGoal) {
      if(olyClass){
        return this.findSimplestWeights(roundedGoal, current+110, olyClass, [...weights, 55])
          || this.findSimplestWeights(roundedGoal, current+90, olyClass, [...weights, 45])
          || this.findSimplestWeights(roundedGoal, current+70, olyClass, [...weights, 35])
          || this.findSimplestWeights(roundedGoal, current+50, olyClass, [...weights, 25])
          || this.findSimplestWeights(roundedGoal, current+30, olyClass, [...weights, 15])
          || this.findSimplestWeights(roundedGoal, current+20, olyClass, [...weights, 10])
          || this.findSimplestWeights(roundedGoal, current+10, olyClass, [...weights, 5])
          || this.findSimplestWeights(roundedGoal, current+5, olyClass, [...weights, 2.5])
          || this.findSimplestWeights(roundedGoal, current+2, olyClass, [...weights, 1])
      } else {
        return this.findSimplestWeights(roundedGoal, current+90, olyClass, [...weights, 45])
        || this.findSimplestWeights(roundedGoal, current+70, olyClass, [...weights, 35])
        || this.findSimplestWeights(roundedGoal, current+50, olyClass, [...weights, 25])
        || this.findSimplestWeights(roundedGoal, current+30, olyClass, [...weights, 15])
        || this.findSimplestWeights(roundedGoal, current+20, olyClass, [...weights, 10])
        || this.findSimplestWeights(roundedGoal, current+10, olyClass, [...weights, 5])
        || this.findSimplestWeights(roundedGoal, current+5, olyClass, [...weights, 2.5])
        || this.findSimplestWeights(roundedGoal, current+2, olyClass, [...weights, 1])
      }
    }
    else return null
  }

  reduceWeights = (weights) => {
    return weights.reduce((accumulator, currentValue) => {
      return `${accumulator} + ${currentValue}`
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Simple Weights</h1>
        </header>
        <p className="App-intro">
          Goal
          <input type="number" value={this.state.goal} onChange={(e)=> this.setState({goal: e.target.value})}/>
        </p>
        <p className="App-intro">
          {this.state.gender ? 'Male Bar - 45lb' : 'Female Bar - 33lb'}
          <input type="checkbox" checked={this.state.gender} onChange={(e)=> {
            this.setState({gender: e.target.checked})}
          }/>
        </p>
        <p className="App-intro">
          Oly
          <input type="checkbox" checked={this.state.olyClass} onChange={(e)=> {
            this.setState({olyClass: e.target.checked})}
          }/>
        </p>
        <p className="App-intro">
          {this.state.goal !== "" && Number(this.state.goal) < (this.state.gender ? 45 : 33)  && (
            <p>Goal weight must be at least as much as the bar</p>
          )}
          {this.state.goal !=="" && Number(this.state.goal) > (this.state.gender ? 45 : 33) && (
            <p>Weights: {this.reduceWeights(this.findSimplestWeights(Number(this.state.goal), this.state.gender ? 45 : 33, this.state.olyClass).weights) }</p>
          )}
          {this.state.goal !=="" && Number(this.state.goal) === (this.state.gender ? 45 : 33) && (
            <p>Empty Bar</p>
          )}
        </p>
      </div>
    );
  }
}

export default App;
