import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { getColleges, addCourse, getCourseQuery } from './queries/queries'



class AddCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course_name: "",
            duration: "",
            college_id: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(e) {
        e.preventDefault()
        this.props.addCourse({
            variables: {
                name: this.state.course_name,
                duration: this.state.duration,
                collegeId: this.state.college_id
            },
            refetchQueries: [{ query: getCourseQuery }]
        })
    }
    onChange(e) {
        this.setState({
            [e.target.name]: `${[e.target.value]}`,
        })
    }

    displayCollege() {
        let data = this.props.getColleges
        if (data.loading) {
            return (
                <option>loading colleges..</option>
            )
        } else if (data.colleges) {
            return data.colleges.map(college =>
                <>
                    <option key={college.id} value={college.id}>{college.name}</option>
                </>
            )
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className=" col-md-6 col-sm-12 " >
                <div className="form md-form">
                    <label>Course Name</label>
                    <input type='text'
                        className="form-control px-0"
                        onChange={this.onChange}
                        // value={this.state.course_name}
                        name='course_name'
                    />
                </div>
                <div className="md-form">
                    <label>Duration</label>
                    <input type="text"
                        className="form-control px-0"
                        onChange={this.onChange}
                        value={this.state.duration}
                        name='duration'
                    />
                </div>

                <div className="">
                    <select className="form-control px-0"
                        name="college_id"
                        value={this.state.college_id}
                        onChange={this.onChange}
                    >
                        <option>Select Your College</option>
                        {this.displayCollege()}
                    </select>
                </div>
                <button className="btn rounded-pill p-2 border z-depth-0">Add<span className="ml-1 fa fa-plus" /></button> 
            </form>
        )
    }
}
export default compose(
    graphql(getColleges, { name: "getColleges" }),
    graphql(addCourse, { name: "addCourse" })
)(AddCourse)

