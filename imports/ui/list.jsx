import React, { Component } from 'react';

export default class List extends Component {

    render() {
        const that = this;
        return (
            <div className="container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {that.props.data.map(function (data, index) {
                        return (
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.gender}</td>
                                <td>{data.email}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

