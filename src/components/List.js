import React, { Component } from 'react';
import Todo from './Todo';
import {Motion, spring} from 'react-motion';

class List extends Component{
  constructor(props){
    super(props);
    this.state = {
      todos:[{id:1, todo:'Take out trash', complete:false}, {id:2, todo:'Walk the dog', complete:true}],
      newTodo:''
    }
  }

  remove(todo){
    this.setState({todos:this.state.todos.filter(e=>e!==todo)})
  }

  textChange(todo){
    this.setState({newTodo:todo})
  }


  // I wish he had called these initial styles instead of defauly styles.
  // What is that starting case for each of these elements.
  getDefaultStlyes(){
    return {styles:{height:0, opacity:1}};
  }

  getStyles(){
    return {styles:{height:spring(60), opacity:spring(1)}};
  }

  add(){
    if (this.state.newTodo){
      let newId = this.state.todos.reduce((newId, e)=>{
        if(e.id>=newId) return e.id+1;
        return newId;
      },0)
      this.setState({
        todos:[...this.state.todos, {todo:this.state.newTodo, complete:false, id:newId}],
        newTodo:''
      })
    }
  }

  listAll(){

    return this.state.todos.map(e=>(
        <div key={e.id} className="todo">
          <Todo  key={e.id} todo={e} remove={this.remove.bind(this, e)}/>
        </div>
    ))
  }


  render(){
    return (
      <div>
        <h1>My things to do</h1>
        {this.listAll()}
        <input type="text" onChange={ input => this.textChange(input.target.value) } value={this.state.newTodo}/>
        <button onClick={()=>this.add()}> New Todo</button>
      </div>
    )
  }
}

export default List;
