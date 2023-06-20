import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/comments.css";

import userPhoto from "../images/userphoto.webp";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const CommentForm = ({ note }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8081/${params.productName}`, {
        name,
        comment,
        productName: params.productName,
        rating,
      })
      .then((res) => {
        setComments(res.data);
        note();
        console.log("Comment submitted successfully:", res.data);
        setName("");
        setComment("");
        setRating(5);
        closeForm();
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  const reviewCount = comments.length;

  useEffect(() => {
    axios
      .get(`http://localhost:8081/${params.productName}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [params.productName, reviewCount]);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="reviews">
        <hr />
        <h3>Reviews ({reviewCount})</h3>
      </div>
      {reviewCount > 0 ? (
        comments.map((comment, index) => (
          <div className="comments" key={index}>
            <div className="top-line">
              <div className="user-img">
                <img src={userPhoto} alt="user-photo" />
              </div>
              <div className="comment-info">
                <div className="comment-name">{comment.name}</div>
                <div className="comment-date">
                  <div className="comment-rating">
                    <AiFillStar
                      className="star"
                      style={{
                        height: "18px",
                        width: "18px",
                      }}
                    />
                    <span>{comment.rating}</span>
                  </div>
                  {new Date(comment.createdAt).toISOString().split("T")[0]}
                </div>
              </div>
            </div>
            <div className="comment">{comment.comment}</div>
          </div>
        ))
      ) : (
        <div className="no-comments">No comments</div>
      )}

      <button className="leave-feedback-btn" onClick={openForm} type="button">
        Leave feedback
      </button>

      {showForm ? (
        <div className="backdrop">
          <div className="form-popup">
            <form onSubmit={handleSubmit}>
              <div className="form-top">
                <h3>Comment</h3>
                <AiOutlineClose
                  style={{
                    width: "30px",
                    height: "auto",
                    color: "#6c7b8a",
                    cursor: "pointer",
                  }}
                  onClick={closeForm}
                />
              </div>
              <div className="form-full-name">
                <span>Full name</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-rating">
                <span>Rating</span>
                <select
                  id="rating"
                  name="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  <option value={1}>★</option>
                  <option value={2}>★★</option>
                  <option value={3}>★★★</option>
                  <option value={4}>★★★★</option>
                  <option value={5}>★★★★★</option>
                </select>
              </div>
              <div className="form-comment">
                <span>Comment</span>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Question or comment"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button className="leave-feedback" type="submit">
                Comment
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CommentForm;
