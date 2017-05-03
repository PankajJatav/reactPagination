import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nouislider from 'react-nouislider';
import FontAwesome from 'react-fontawesome';

// App component - represents the whole app
export default class PaginationPanel extends Component {

    constructor (props, context) {
        super(props, context);
        this.state = {
            min: 1,
            max:Math.ceil(props.length/props.perPage),
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            max:Math.ceil(props.length/props.perPage)
        });
        ReactDOM.findDOMNode(this.refs.pageInput).value = props.currentPage;
    }

    handleReverseValue(event){
        event.preventDefault();
        const value = ReactDOM.findDOMNode(this.refs.pageInput).value.trim();
        const {min, max} = this.state;
        if( value > min && value < max ){
            this.props.updateCurrentPage(value);
        } else {
            alert('Please enter valid value');
        }
    }

    updateChange(evt){
        this.props.updateCurrentPage(evt[0]);
    }

    render() {
        const that = this;
        const {min, max} = this.state;
        const reverseValue= this.props.currentPage;
        const perPage= this.props.perPage;
        return (
            <div className="container">
                <div className="perpage">
                    <a onClick={() => that.props.handlePerPage(1)}>
                        <FontAwesome name='chevron-up'/>
                    </a>
                    <br />
                    <b>{perPage}</b>
                    <br />
                    <a  onClick={() => that.props.handlePerPage(0)}>
                        <FontAwesome name='chevron-down'/>
                    </a>
                </div>

                <br />
                <br />
                <br />

                <Nouislider
                    range={{min: min, max: max}}
                    start={[reverseValue]}
                    step={1}
                    format = {{
                        to: function (value) {
                            return parseInt(value);
                        },
                        from: function (value) {
                            return value
                        }
                    }}
                    tooltips
                    pips = {{
                        mode: 'values',
                        values: [min, max],
                        density: 1

                    }}
                    onChange = {(evt) => that.updateChange(evt)}
                />
                <br />
                <br />
                <br />
                <a className="pagePrev pageSkip" name="prePage" onClick={() => that.props.handlePageSkip(0)}>
                    <FontAwesome name='chevron-left'/>
                </a>
                <form className="new-task" onSubmit={(evt) => that.handleReverseValue(evt)} >
                    <input id="pageInput" min={min} max={max} className="pageInput" type="text" maxLength="3" placeholder="2" defaultValue={reverseValue} ref="pageInput"/>
                </form>
                <a className="pageNext pageSkip" name="nextPage"  onClick={() => that.props.handlePageSkip(1)}>
                    <FontAwesome name='chevron-right'/>
                </a>

            </div>
        );
    }
}


