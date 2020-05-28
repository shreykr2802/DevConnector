import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../store/actions/profile';

const AddEducation = ({addEducation, history}) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = event => {
        event.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add Your Education
            </h1>
            <p class="lead">
                <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you have attended
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={event => onSubmit(event)}>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        required
                        value={school} onChange={event => onChange(event)}
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        required
                        value={degree} onChange={event => onChange(event)}
                    />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={event => onChange(event)}/>
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={event => onChange(event)}/>
                </div>
                <div class="form-group">
                    <p>
                        <input type="checkbox" name="current" checked={current} value={current} onChange={event => {
                            setFormData({...formData, current: !current});
                            toggleDisabled(!toDateDisabled);
                        }} />{' '}Current School or Bootcamp
                    </p>
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
                        placeholder="Program Description"
                        value={description} onChange={event => onChange(event)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));
