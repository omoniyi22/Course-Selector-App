import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getOneCourseQuery } from './queries/queries'

class CourseDetails extends Component {
  constructor() {
    super()
    this.state = {
      null: null
    }
  }
  componentDidUpdate() {

  }
  displayCourseDetails() {
    console.log(this.props)
    let course = this.props.data.course
    if (this.props.Id == null || this.props.Id == undefined) {
      return (
        <div> No Course Selected Yet</div>
      )
    } else if (course && this.props.Id != null && this.props.Id != "null" && !this.props.data.loading) {
      return (
        <div key={course.id}>
          <span className="font-weight-bold"> Name: {course.name}</span>
          <span className="ml-2 font-weight-bold"> Duration: {course.duration == null ? 0 : course.duration}</span>
          {course.college.length > 0 && course.college.map(res =>
            <>  <span className="ml-2 font-weight-bold">College: {res.name}</span>
              <div className="mt-2">
                <span className="underline font-weight-bold mx-auto" >List of courses offered in the University</span>
                <ol className="mlist mb-2">
                  {course.college[0].course != [] && course.college[0].course.map(data =>
                    <li className='mt-1'>{data.name}</li>
                  )}
                </ol>
              </div>
            </>
          )}
        </div>
      )
    } else if (this.props.Id == "null") {
      return (
        <div>  Course has been deleted</div>
      )
    }
  }
  render() {
    return (
      <div className="col-md-6 col-sm-12 mx-auto mt-5 py-3 content-justify-center course-details">
        <span className="courses form CD mb-0" >
          {this.displayCourseDetails()}
        </span>
      </div>
    )
  }
}
export default graphql(getOneCourseQuery, {
  options: (props) => {
    if (props.Id !== null) {
      return {
        variables: {
          id: props.Id
        }
      }
    }
  }
})(CourseDetails)