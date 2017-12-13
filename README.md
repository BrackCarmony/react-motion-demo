# React Motion Demo

Demo for working with the TransitionMotion component from react-motion.  TransitionMotion lets us create a list that will animate when we add or remove items from the array.  

We are starting with a simple TODO app in react.  We can create and remove todo items from our list.  We can start the dev server by running `npm start`


## install react-motion

To instll react-motion into our project we can use npm.

`npm install react-motion`

Inside of any component where we want to use the TransitionMotion component, it will need to make sure that we import it, along with the helper spring function.

```js
import React, { Componnet } from 'react';
import { TransitionMotion, spring} from 'react-motion';
```

## 4 pieces of information

- defaultStyles
- styles
- willEnter
- willLeave

The TransitionMotion component has 4 pieces of information that we need to supply to have it fully setup.

- defaultStyles -
  This is the initial styles for all items in our array when the component first loads.  Usually we will want to loop through each item in our array and create initial values for the items.  Such as the height being 0, or the left position being negative to start off screen.

- style -
  This is the end styles that we want our items to have.  So the would have their final height set, or a positive left value to place them towards the center of the screen.  

Both these two will be setup as functions that return an array of objects. These objects will have 3 properties on them.  

Sample of what we want to set our defaultStyles to
```js
[{
  style:{height:0, opacity:0}
  data:{todo:'Write repo', complete:false, id:1}
  key: '1Key'
},
...]
```

Example of what our getDefaultStyles function may look like
```js
getDefaultStyles(){
  return this.state.todos.map(e=>({
    style:{height:0, opacity:0},
    data:e,
    key:e.id+'key'
    }))
}
```

A few odd quirks, we have to pass our data through the defaultStyles and styles properties.  This is so that even after we remove the data from state, the TransitionMotion component will still know what information it needs to display until the component is removed.

Also the key property must be a string, it cannot be a number.  That is why I am appending key to the end of the id to make the keys.  There's nothing special about using key at the end of the string.  


Sample of what we want to set our styles to
```js
[{
  style:{height:spring(100), opacity:spring(1)}
  data:{todo:'Write repo', complete:false, id:1}
  key: '1Key'
},
...]
```

Example of what our getDefaultStyles function may look like
```js
getStyles(){
  return this.state.todos.map(e=>({
    style:{height:spring(0), opacity:spring(0)},
    data:e,
    key:e.id+'key'
    }))
}
```

For the styles property it's going to look very similar.  The biggest difference is that our target styles will have spring values attached to them.  What the spring is doing is calculating the difference between what we have currently, and what our springs desired value is.  Then changes it accordingly.  (we can optionally pass in an additional object to describe how strong the spring itself should be)

Again we pass in the data property as well as the key so that it can match and keep track of any items that we are using.


- willEnter - This is the style that a new element should have.  It is for elements created after the initial load vs the defaultStyles which are for elements that are present on first render.

- willLeave - These are the styles that an element shold change to beore it gets removed from the collection.  This will trigger when we remove the elemnt from state.  It will notice that a key is missing, and updating it's styles before removing it.

```js
willEnter(){
  return {
    height:0,
    opacity:0
  }
}
```

```js
willLeave(){
  return {
    height:spring(0),
    opacity:spring(0)
  }
}
```

Notice that for each of these we don't have to pass in the data or the key.  (those will be grabbed from the getStyles function when it is applied)  The willEnter won't use spring values as it isn't a target but a starting value.  The willLeave will usually use spring values to approach that value during the transition vs setting it directly to that value.  

## What TransitionMotion gives us

So we've written a bunch of functions that TransitionMotion will need to work.  What does it give us in return.  Well it will give us a currentStyles array of objects that has the styles and data that we provided.  The styles will change until the animation finishes.

The way we get access to it is by passing in a callback function as the child of our TransitionMotion component.

```html

<TransitionMotion
defaultStyles={this.getDefaultStyles()}
styles={this.getStyles()}
willEnter={this.willEnter}
willLeave={this.willLeave}>
{ currentStyles => (
  <ul className="List">
    {currentStlyes.map(e=>{
      <li style={e.style}>{e.data.todo}</li>
    })}
  </ul>
  )
}
</TransitionMotion>
```

Inside the callback function, we want to return the JSX template representing our list TransitionMotion is modeling.

We start by returning an unordered list. Then we will map over all the elements in the currentStlyes array.  We will use the style property from the currentStyles to add styles to our individual list items.  As well as the data that was passed through to display the messages from each of our todo items.  

Now when we add or remove items.  It will automatically transition them into and out of dom.  
