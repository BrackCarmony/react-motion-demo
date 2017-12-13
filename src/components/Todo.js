import React from 'react';

export default function(props){
  return (
    <div>
      {props.todo.todo} <span>Checkmark</span> <span onClick={props.remove}>X</span> {props.todo.id}
    </div>
  )
}
