import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../store/actions/profile';

const AddExperience = ({addExperience, history}) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = event => {
        event.preventDefault();
        addExperience(formData, history);
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add An Experience
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={event => onSubmit(event)}>
                <div class="form-group">
                    <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={event => onChange(event)}/>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="* Company" name="company" required value={company} onChange={event => onChange(event)}/>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={event => onChange(event)}/>
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={event => onChange(event)}/>
                </div>
                <div class="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={event => {
                        setFormData({...formData, current: !current});
                        toggleDisabled(!toDateDisabled);
                    }} />{' '}Current Job</p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={event => onChange(event)} disabled={toDateDisabled}/>
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={event => onChange(event)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    );
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));
