import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex extends Component{
    
    componentDidMount(){
        this.props.fetchPosts()
    }
    renderPosts() {
        return _.map(this.props.posts, post => {
            console.log(post.content.length)
            return <li className="card" key={post.id}>
            <div>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{post.category}</h6>
                    <p className="card-text">{post.content.length > 100 ? post.content.substring(0, 100) +' ...' : post.content}</p>
                    <Link className="card-link" to={`/posts/${post.id}`}>
                        go to post &#x21AA;
                    </Link>
                </div>
            </div>
            </li>
        })
    }

    render(){
        return(
            <div className="posts_index">
                <div className="title-section">
                    <div className="container">
                        <h3 className="pull-xs-left">All Posts</h3>
                        <div className="pull-xs-right">
                            <Link to="/posts/new" className="btn"  >
                                <h3 className="header_add-post"><img src="/images/plus-sign.png" /> Add a Post</h3>
                            </Link>
                        </div>
                    </div>
                    
                </div>
                <div className="body">
                    <div className="container">
                        <ul className="list-group">
                            {this.renderPosts()}
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        posts: state.posts
    }
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
