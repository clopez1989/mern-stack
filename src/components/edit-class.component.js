import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class EditClass extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeClassesDescription = this.onChangeClassesDescription.bind(this);
        this.onChangeGPA = this.onChangeGPA.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
            email : '',
            classesDescription: '',
            gpa: '',
            date: new Date(),
            users: []
        }  
    }

    componentDidMount() {
        axios.get('http://localhost:5000/classes/'+this.props.match.params.id)
            .then(response => {
                this.setState ({
                    username: response.data.username,
                    email: response.data.email,
                    classesDescription: response.data.classesDescription,
                    gpa: response.data.gpa,
                    date: new Date(response.data.date)
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState ({
                        users: response.data.map(user => user.username),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeClassesDescription(e) {
        this.setState({
            classesDescription: e.target.value
        });
    }
    onChangeGPA(e) {
        this.setState({
            gpa: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const classes ={
            username: this.state.username,
            email: this.state.email,
            classesDescription: this.state.classesDescription,
            gpa: this.state.gpa,
            date: this.state.date
        }

        console.log(classes);

        axios.post('http://localhost:5000/classes/update/'+this.props.match.params.id, classes)
            .then(res => console.log(res.data));


        window.location ="/";
    }

    render() {
        return(
            <div>
                <h3>Edit Classes List</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <select ref="userInput" required className="form-control" value ={this.state.username}
                        onChange = {this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                                return <option key={user}
                                value= {user}>{user}
                                </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Class: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.classesDescription}
                        onChange={this.onChangeClassesDescription}/>
                    </div>
                    <div className="form-group">
                        <label>GPA: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.gpa}
                        onChange={this.onChangeGPA}/>
                    </div>
                    <div className="form-group">
                        <label>Date of Completion: </label>
                        <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Class List" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}