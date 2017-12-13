import React, { Component } from 'react';
import Todo from './Todo';
import {TransitionMotion, spring} from 'react-motion';

class List extends Component{
  constructor(props){
    super(props);
    this.state = {
      todos:[{id:1, todo:'Take out trash', complete:false}, {id:2, todo:'Walk the dog', complete:true}, {id:3, todo:'Walk the cat', complete:true}, {id:4, todo:'Walk the penguine', complete:true}],
      newTodo:''
    }
  }

  remove(todo){
    console.log(todo);
    this.setState({todos:this.state.todos.filter(e=>e!==todo)})
  }

  textChange(todo){
    this.setState({newTodo:todo})
  }


  // I wish he had called these initial styles instead of defauly styles.
  // What is that starting case for each of these elements.
  getDefaultStlyes(){
    // Here we are going to return a style object for each todo in our list.
    // We could apply some other style properties here if we wanted to change
    // other properties starting values based on something
    return this.state.todos.map((e)=>({key:e.id+'key',data:e,  style:{'height':0,  opacity:1}}));
  }

  // The goals of each element.  We can use the spring helper function to
  // set a target for each property.  We can also optionally pass in extra
  // information about how the spring should operate.
  // In this case we will start with all elements having the same goal.
  getStyles(){
    return this.state.todos.map((e)=>({key:e.id+'key',data:e, style:{height:spring(90), opacity:spring(1)}}));
  }

  willEnter() {
    return {
      height: 0,
      opacity: 0,
    };
  };

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0)
    };
  };

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

    return(
    <div>
    How About this?
      <TransitionMotion
        defaultStyles={this.getDefaultStlyes()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >{
        styles=>(
          <div className="List">
            {styles.map((e)=>{
              console.log(e.data);
            return(
                <div key={e.key} className="motionItem" style={e.style} >
                  {e.data.todo} <span class="delete" onClick={()=>this.remove(e.data)}>X</span>
                </div>
              )
            })
            }
          </div>
        )
      }
      </TransitionMotion>
    </div>
    )
  }


  render(){
    return (
      <div>
        <h1>My things to do</h1>
        <input type="text" onChange={ input => this.textChange(input.target.value) } value={this.state.newTodo}/>
        <button onClick={()=>this.add()}> New Todo</button>
        {this.listAll()}



      </div>
    )
  }
}

export default List;
