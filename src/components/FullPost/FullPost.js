import React, { Component } from "react";
import "./FullPost.css";
import axios from "axios";

class FullPost extends Component {
    state={
        loadedPost:null,
    }
  componentDidUpdate() {
    if (this.props.postId) {
    if(!this.state.loadedPost||(this.state.loadedPost && this.state.loadedPost.id!==this.props.postId))
      axios.get(
        "/posts/" + this.props.postId
      ).then((loadedPost)=>{
        this.setState({loadedPost:loadedPost})
      });
    }
  }
  deleteHandler=()=>{
    axios.delete("/posts" + this.props.postId)
    .then((response)=>{
      console.log(response);
    });
  }
  render() {
    let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
    if(this.props.postId){
        post=<p style={{textAlign:'center'}}>Loading.....</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
    <h1>{this.state.loadedPost.data.title}</h1>
      <p>{this.state.loadedPost.data.body}</p>
          <div className="Edit">
            <button onClick={this.deleteHandler} className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}
export default FullPost;
