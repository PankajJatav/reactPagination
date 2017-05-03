/* * ************************************************************
 * Date: 2 May, 2017
 * Programmer: Pankaj Jatav <pankajkumar.jatav@raksanconsulting.com>
 * Description : Represents the whole app
 * JavaScript XML file App.jsx
 * *************************************************************** */

import React, { Component } from 'react';
import List from './list';
import PaginationPanel from './paginationPanel';
let dummyData = require('/imports/data/testData.js');

// App component - represents the whole app
export default class App extends Component {

    constructor (props, context) {
        super(props, context)
        this.state = {
            data: dummyData.slice(0,5),
            length: dummyData.length,
            perPage: 5,
            currentPage: 1
        }
        this.handlePageSkip = this.handlePageSkip.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
        this.handlePerPage = this.handlePerPage.bind(this);
    }

    createData(){
        var begin = (this.state.currentPage-1) * this.state.perPage;
        var end = begin + this.state.perPage;
        this.setState({
            data: dummyData.slice(begin, end)
        });
    }

    handlePageSkip(type){
        var that = this;
        var currentPage = this.state.currentPage;
        var stateCurrentPage = this.state.currentPage;
        var min = 1;
        var max = Math.ceil(this.state.length/this.state.perPage);
        if(type == 1 && stateCurrentPage < max ){
            currentPage = stateCurrentPage + 1;
        } else if(type == 0 && stateCurrentPage > min ){
            currentPage = stateCurrentPage - 1;
        }
        if( currentPage != stateCurrentPage ){
            this.setState({
                currentPage:currentPage
            }, function(){
                that.createData();
            });
        }
    }

    handlePerPage(type) {
        var that = this;
        var min = 1;
        var pageNo = this.state.perPage;
        if(type == 1){
            pageNo = pageNo + 1;
        } else if (type == 0 && pageNo !=min){
            pageNo = pageNo - 1;
        }
        if( pageNo != this.state.perPage ) {
            this.setState({
                perPage:pageNo,
                currentPage:1
            }, function(){
                    that.createData();
            });
        }
    }

    updateCurrentPage(pageNo) {
        this.setState({
            currentPage: parseInt(pageNo)
        });
        this.createData();
    }

    render() {
        const that = this;
        const { data, length, perPage, currentPage } = this.state;
        return (
            <div className="container">
                <h1> React Pagination </h1>
                <List data={data} />
                <PaginationPanel handlePerPage={this.handlePerPage} updateCurrentPage={this.updateCurrentPage} handlePageSkip={this.handlePageSkip} length={length} perPage={perPage} currentPage={currentPage} />
            </div>
        );
    }
}


