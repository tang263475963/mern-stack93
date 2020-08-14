import React, { Component } from 'react'
import axios from 'axios';
import { Table, Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            id: 0,
            name: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api')
            .then((res) => {
                this.setState({
                    users: res.data,
                    id: 0,
                    name: '',
                    email: '',
                    password: ''
                })
                console.log(res.data);
            })
    }

    delete(id) {
        axios.delete(`http://localhost:8000/api/${id}`)
            .then(() => {
                this.componentDidMount();
            })
    }

    edit(id) {
        axios.get(`http://localhost:8000/api/${id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    password: res.data.password,
                })
            })
    }

    namechange = event => {
        this.setState({
            name: event.target.value
        })
    }

    emailchange = event => {
        this.setState({
            email: event.target.value
        })
    }

    passwordchange = event => {
        this.setState({
            password: event.target.value
        })
    }

    submit(event, id) {
        event.preventDefault()
        if (id === 0) {
            axios.post(`http://localhost:8000/api/`, { name: this.state.name, email: this.state.email, password: this.state.password })
                .then(() => {
                    this.componentDidMount();
                })

        } else {
            axios.put(`http://localhost:8000/api/${id}`, { name: this.state.name, email: this.state.email, password: this.state.password })
                .then(() => {
                    this.componentDidMount();
                })
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(user =>
                                        <tr key={user._id}>
                                            <td> {user.name} </td>
                                            <td> {user.email} </td>
                                            <td> {user.password} </td>
                                            <td>
                                                <Button color="info" onClick={(e) => this.edit(user._id)}>Edit</Button>{' '}
                                                <Button color="danger" onClick={(e) => this.delete(user._id)} >Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Form onSubmit={(e) => this.submit(e, this.state.id)}>
                            <FormGroup row>
                                <Label sm={2}> Name:</Label>
                                <Col sm={10}>
                                    <Input type="text" onChange={(e) => this.namechange(e)} value={this.state.name} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>Email:</Label>
                                <Col sm={10}>
                                    <Input type="email" onChange={(e) => this.emailchange(e)} value={this.state.email} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> Password: </Label>
                                <Col sm={10}>
                                    <Input type="password" onChange={(e) => this.passwordchange(e)} value={this.state.password} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button type="submit">Send</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}