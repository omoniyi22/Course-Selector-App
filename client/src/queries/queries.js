import { gql } from 'apollo-boost'

const getCourseQuery = gql`
{
    courses{
        name
        id
    }
}
`
const getColleges = gql`
{
    colleges{
        name
        id
    }
}
`
const addCourse = gql`
mutation($name: String!,$duration:String! $collegeId: ID!){
    addCourse(name: $name, duration: $duration, collegeId: $collegeId ){
    name
    id
    }
}
`
const getOneCourseQuery = gql`
    query($id: ID){
        course(id: $id){
            id
            name
            duration
            college{
                id
                name
                since
                course{
                    name
                }
            }
        }
    }
`
const deleteCourse = gql`
    mutation($id: ID!){
        deleteCourse(id: $id){
            name
        }
    }
`


export { getColleges, deleteCourse, getCourseQuery, addCourse, getOneCourseQuery }