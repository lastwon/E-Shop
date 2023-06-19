import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/comments.css";

import userPhoto from "../images/userphoto.webp";

const CommentForm = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8081/${params.productName}`, {
        name,
        comment,
        productName: params.productName,
      })
      .then((res) => {
        console.log("Comment submitted successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/${params.productName}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [params.productName]);

  return (
    <>
      {comments.length > 0 ? (
        <>
          <div className="reviews">
            <hr />
            <h3>Reviews</h3>
          </div>
          {comments.map((comment, index) => (
            <div className="comments" key={index}>
              <div className="top-line">
                <div className="user-img">
                  <img src={userPhoto} alt="user-photo" />
                </div>
                <div className="comment-info">
                  <div className="comment-name">{comment.name}</div>
                  <div className="comment-date">{comment.createdAt}</div>
                </div>
              </div>
              <div className="comment">{comment.comment}</div>
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CommentForm;
