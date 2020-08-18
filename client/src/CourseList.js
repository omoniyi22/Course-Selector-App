import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { getColleges, deleteCourse, getCourseQuery, addCourse, getOneCourseQuery } from './queries/queries'
import CourseDetails from './CourseDetails'
import { flowRight as compose } from 'lodash'



class CourseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
        this.onDelete = this.onDelete.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    onClick(e) {
        this.setState({ selected: e.target.id })
    }
    onDelete(e) {
        if (e.target.id === this.state.selected) {
            this.setState({
                selected: "null"
            })
        }

        console.log(this.state.selected)
        this.props.deleteCourse({
            variables: {
                id: `${e.target.id}`
            },
            refetchQueries: [
                { query: getOneCourseQuery },
                { query: getCourseQuery },
                
            ]
        })
        this.displayCourse()
    }
    displayCourse() {
        console.log(data)
        var data = this.props.getCourseQuery;
        if (!data) {
            return (
                <div>loading ...</div>
            )
        } else if (data.courses) {
            return data.courses.map(course => {
                return (
                    <div className=" mx-auto py-1 border-bottom px-2 py-1 mt-1 white">
                        <div>
                            <span id={course.id} onClick={this.onClick}>
                                {course.name}
                            </span>
                            <div className="float-right fa fa-trash mt-1" id={course.id} onClick={this.onDelete}></div>
                        </div>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div className="row  mx-0 p-0">
                <div className="col-md-6 col-sm-12 px-2  mt-5 ">
                    <div className="border p-2 ">
                        {this.displayCourse()}
                    </div>
                </div>
                <CourseDetails Id={this.state.selected !== null ? this.state.selected : null} />
            </div>
        )
    }
}
export default compose(
    graphql(deleteCourse, { name: "deleteCourse" }),
    graphql(getCourseQuery, { name: "getCourseQuery" }),
    graphql(getOneCourseQuery, { name: "getOneCourseQuery" }),
    graphql(getColleges, { name: "getColleges" })
)(CourseList)