import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../utility/axios.js";
import Layout from "../../Layout/Layout.jsx";
import styles from "./answer.module.css";
import { MdAccountCircle } from "react-icons/md";
import moment from "moment";
import { UserState } from "../../App.jsx";
import { LuCalendarClock } from "react-icons/lu";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function QuestionAndAnswer() {
  const [questionDetails, setQuestionDetails] = useState({});
  const { user } = useContext(UserState);
  const userId = user?.userid;
  const { questionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [expandedAnswer, setExpandedAnswer] = useState(null);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingAnswerText, setEditingAnswerText] = useState("");
  const answerInput = useRef();

  // Fetch the question details
  useEffect(() => {
    axiosInstance.get(`/question/${questionId}`).then((res) => {
      setQuestionDetails(res.data);
      setLoading(false);
    });
  }, [questionId]);

  // Post a new answer
  async function handlePostAnswer(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/answer", {
        userid: userId,
        answer: answerInput.current.value,
        questionid: questionId,
      });
      if (response.status === 201) {
        Swal.fire("Success!", "Answer submitted successfully!", "success").then(() => {
          window.location.reload();
        });
      }
    } catch {
      Swal.fire("Error", "Failed to post answer. Please try again later.", "error");
    }
  }

  // Edit an answer
  const handleEditAnswer = (answerId, answerText) => {
    setEditingAnswerId(answerId);
    setEditingAnswerText(answerText);
  };

  // Save an edited answer
  const handleSaveAnswer = async (answerId) => {
    try {
      const response = await axiosInstance.put(`/answer/${answerId}`, {
        answer: editingAnswerText,
        userId: userId,
      });
  
      Swal.fire("Updated!", "The answer has been updated.", "success");
  
      // Update the specific answer in the state
      setQuestionDetails((prev) => ({
        ...prev,
        answers: prev.answers.map((answer) =>
          answer.answerid === answerId
            ? { ...answer, answer: response.data.updatedAnswer || editingAnswerText }
            : answer
        ),
      }));
  
      setEditingAnswerId(null);
      setEditingAnswerText("");
    } catch {
      Swal.fire("Error", "Failed to update answer.", "error");
    }
  };
  
  // Delete an answer
  const handleDeleteAnswer = async (answerId) => {
    try {
      await axiosInstance.delete(`/answer/${answerId}`,{
        userId:userId
      });
      Swal.fire("Deleted!", "The answer has been deleted.", "success");
      setQuestionDetails((prev) => ({
        ...prev,
        answers: prev.answers.filter((answer) => answer.answerid !== answerId),
      }));
    } catch {
      Swal.fire("Error", "Failed to delete answer.", "error");
    }
  };
  const handleCancelEdit = () => {
    setEditingAnswerId(null); // Exit editing mode
    setEditingAnswerText(""); // Clear the editing text
  };
  // Truncate text
  const truncateText = (text, limit = 50) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > limit) {
      return (
        <>
          {words.slice(0, limit).join(" ")}{" "}
          <span
            style={{
              color: "var(--blue-shade)",
              cursor: "pointer",
            }}
            onClick={() => toggleExpandAnswer(null)}
          >
            ... See More
          </span>
        </>
      );
    }
    return text;
  };

  // Toggle expanded answers
  const toggleExpandAnswer = (answerId) => {
    setExpandedAnswer((prev) => (prev === answerId ? null : answerId));
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div>
            <h1 className={styles.questionTitle}>Question</h1>
            <p className={styles.questionDescription}>{questionDetails?.description}</p>
            <p className={styles.question_date}>
              Asked by:{" "}
              <span style={{ fontWeight: "600" }}>@{questionDetails?.qtn_username}</span> <br />
              <LuCalendarClock size={19} />{" "}
              {moment(questionDetails.qtn_createdAt).format("ddd, MMM DD, YYYY h:mm A").toUpperCase()}
            </p>
          </div>
          <hr />
          <h2 className={styles.answersTitle}>Answers From the Community:</h2>
          <hr />
          {questionDetails?.answers?.length > 0 ? (
            questionDetails.answers.map((answer) => (
              <div key={answer.answerid} className={styles.answerHolder}>
                <div className={styles.accountHolder}>
                  <MdAccountCircle size={50} />
                  <div className={styles.profileName}>{answer?.username}</div>
                </div>
                <div className={styles.answerTextContainer}>
                  {editingAnswerId === answer.answerid ? (
                    <>
                      <textarea
                        value={editingAnswerText}
                        onChange={(e) => setEditingAnswerText(e.target.value)}
                      />
                      <button onClick={() => handleSaveAnswer(answer.answerid)}>Save</button>
                      <button className={styles.cancelButton} onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <p>
                      {expandedAnswer === answer.answerid
                        ? answer.answer
                        : truncateText(answer.answer)}
                    </p>
                  )}
                </div>
                <div className={styles.answerButtonsContainer}>
                  {userId === answer.userid && (
                    <>
                      <button onClick={() => handleEditAnswer(answer.answerid, answer.answer)} className={styles.editButton}>
                        <FaEdit size={18} /> Edit
                      </button>
                      <button onClick={() => handleDeleteAnswer(answer.answerid)} className={styles.deleteButton}>
                        <FaTrashAlt size={18} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No answers yet! Be the first to contribute your answer.</p>
          )}
          <section className={styles.answerFormSection}>
            <h3 className={styles.answerFormTitle}>Answer The Top Question</h3>
            <form onSubmit={handlePostAnswer}>
              <textarea ref={answerInput} className={styles.answerInput} placeholder="Your Answer..." required />
              <button className={styles.postAnswerButton} type="submit">Post Your Answer</button>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default QuestionAndAnswer;
