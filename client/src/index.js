import React, { Component } from 'react'
import './main.css'
import CourseList from './CourseList'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddCourse from './AddCourse'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({
  uri: `hhttps://course4us.herokuapp.com/graphql`
})
class Graph extends Component {
  render() {
    
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <CourseList />
          <AddCourse />
        </div>
      </ApolloProvider>
    )
  }
}


ReactDOM.render(
  <BrowserRouter >
      <Graph />
  </BrowserRouter>,
  document.getElementById('root'),
);