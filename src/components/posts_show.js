import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPost, deletePost } from '../actions/';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount(){
        const { id } =this.props.match.params
        this.props.fetchPost(id);
    }
    onDeleteClick(){
        const { id } = this.props.match.params
;        this.props.deletePost(id, ()=>{
        this.props.history.push('/')
})
    }
    
    // emptyTrashCan(e){

    //     e.setAttribute('src', '/images/empty_trash_bag.png')
    //    console.log(e);
    // }
    render(){
        const { post } =this.props;
        if(!post){
            return <div>Loading...</div>
        }
        return(
            <div className="body posts-show">
                <div className="title-section">
                    <div className="container">
                        <Link className="pull-xs-left back-to-index" to='/'><h6>&#x21A9; Back to Index</h6></Link>
                        <div className="pull-xs-right trash-can"> 
                            Trash Post &#x21E8;<img src="/images/empty_trash_bag.png" onMouseOver={(e) => e.currentTarget.src = '/images/full_trash_can.png'} onMouseOut={(e) => e.currentTarget.src = '/images/empty_trash_bag.png'} onClick={this.onDeleteClick.bind(this)} />
                        </div>
                       
                        {/* <button
                        className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete Post
                </button> */}
                    </div>
                </div>
                
                <div className="container">
                    <div className="card">
                        <h6 className="pull-xs-right categories"><span>Categories:</span> {post.categories}</h6>
                        <h3 >{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({posts}, ownProps){
    return {
        post: posts[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow)

