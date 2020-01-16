import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId:null,
    error:false,
  };
  componentDidMount() {
    axios
      .get("http://jsonplaceholder.typicode.com/postsss")
      .then(data => {
        const updateddata = data.data.map(post => {
          return {
            ...post,
            author: "owais"
          };
        });
        this.setState({ posts: updateddata });
      })
      .catch(err => this.setState({error:true}));
  }
  postSelectionHandler=(id)=>{
    this.setState({selectedPostId:id});
  }
  render() {
    let posts=<p style={{textAlign:'center'}}>Something went wrong</p>
    if(!this.state.error){
    posts=this.state.posts.map(post => (
      <Post 
      key={post.id} 
      title={post.title} 
      author={post.author} 
      clicked={()=>{this.postSelectionHandler(post.id)}}/>
    ));
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost postId={this.state.selectedPostId}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
