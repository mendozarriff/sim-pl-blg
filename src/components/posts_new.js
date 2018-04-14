import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/';

class PostsNew extends Component{

    renderField(field){
        const { meta: {touched, error} } = field; 
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        
        return(
            <div>
                <div className={className}>
                    {/* <label><h6>{field.label}</h6></label> */}
                    <input
                        className="form-control"
                        type="text"
                        placeholder={field.label}
                        {...field.input}
                    />
                    {touched ? error : ''}
                </div>
            </div>
            
        )
    }

    renderTextArea(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return(
            <div>
                <div className={className}>
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder={field.label}
                        {...field.input}
                    />
                    {touched ? error : ''}
                </div>
            </div>
            
        )
    }
    onSubmit(values){
        this.props.createPost(values, ()=>{
            this.props.history.push('./');
        });
    }

    render(){
        const { handleSubmit } = this.props;
       return (
           <div>
               <div className="title-section">
               <h3 className="container">Post Something</h3>
               </div>
               <div className="form">
                   <div className="container">
                       <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="card">
                           <Field
                               label="Title"
                               name="title"
                               component={this.renderField}
                           />
                           <Field
                               label="Categories"
                               name="categories"
                               component={this.renderField}
                           />
                           <Field
                               label="Post Content"
                               name="content"
                               component={this.renderTextArea}
                           />
                           <button className="btn btn-success">Submit</button>
                           <Link to="/" className="btn btn-danger">Cancel</Link>
                       </form>
                   </div>
               </div>
           </div>
           
        )
    }
}

function validate(values){

    const errors={}
    if(!values.title){
        errors.title = "Enter a title"
    }
    if (!values.categories) {
        errors.categories = "Enter some categories"
    }
    if (!values.content) {
        errors.content = "Enter some content"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
);