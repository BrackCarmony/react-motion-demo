import React, { Component } from 'react';
import Todo from './Todo';
import {TransitionMotion, spring} from 'react-motion';

class List extends Component{
  constructor(props){
    super(props);

    // Start with some dummy data so that we don't have to add stuff each time.
    this.state = {
      todos:[
        {id:1, todo:'Take out trash', complete:false},
        {id:2, todo:'Walk the dog', complete:true},
        {id:3, todo:'Walk the cat', complete:true},
        {id:4, todo:'Walk the penguine', complete:true}
      ],
      newTodo:''
    }
  }

  textChange(todo){
    this.setState({newTodo:todo})
  }

  add(event){
    event.preventDefault();
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

  remove(todo){
    this.setState({todos:this.state.todos.filter(e=>e!==todo)})
  }

  listAll(){
    return (
      <div className="List">
        {this.state.todos.map((e)=>{
        return (
            <div key={e.key} className="motionItem" style={e.style} >
              {e.todo} <span class="delete" onClick={()=>this.remove(e)}>X</span>
            </div>
          )
        })}
      </div>
    )
  }


  render(){
    return (
      <div>
        <h1>My things to do</h1>
        <form onSubmit={(event)=>this.add(event)}>
          <input type="text" onChange={ input => this.textChange(input.target.value) } value={this.state.newTodo}/>
          <button type="submit"> New Todo</button>
        </form>
        {this.listAll()}
      </div>
    )
  }
}

export default List;
