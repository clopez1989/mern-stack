import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Classes = props => (
  <tr>
    <td>{props.classes.username}</td>
    <td>{props.classes.email}</td>
    <td>{props.classes.classesDescription}</td>
    <td>{props.classes.gpa}</td>
    <td>{props.classes.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.classes._id}>edit</Link> | <a href="#" onClick={() => { props.deleteClasses(props.classes._id) }}>delete</a>
    </td>
  </tr>
)

export default class ClassesList extends Component {
  constructor(props) {
    super(props);

    this.deleteClasses = this.deleteClasses.bind(this)

    this.state = {classes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/classes/')
      .then(response => {
        this.setState({ classes: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteClasses(id) {
    axios.delete('http://localhost:5000/classes/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      classes: this.state.classes.filter(el => el._id !== id)
    })
  }

  classesList() {
    return this.state.classes.map(currentclasses => {
      return <Classes classes={currentclasses} deleteClasses={this.deleteClasses} key={currentclasses._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>All Classes</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>GPA</th>
              <th>Date of Completion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.classesList() }
          </tbody>
        </table>
      </div>
    )
  }
}