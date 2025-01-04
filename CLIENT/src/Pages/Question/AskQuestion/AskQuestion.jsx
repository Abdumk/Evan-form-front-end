import  { useContext, useRef } from "react";
import classes from "./askQuestion.module.css";
import { axiosInstance } from "../../../utility/axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../Layout/Layout.jsx";
import { UserState } from "../../../App.jsx";
// this is imported for bootstrap sweet alert
import Swal from "sweetalert2";

function AskQuestion() {
  const navigate = useNavigate();
  const { user } = useContext(UserState);

  // const navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();
  const userId = user?.userid;
  console.log(user);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleDom.current.value;
    const description = descriptionDom.current.value; 
    const userid = userId;
    const tag = "General";

    try {
      // Make a POST request to your server to create a new question
      const response = await axiosInstance.post("/question", {
        userid,
        title,
        description,
        tag,
      });
      if (response.status === 201) {
        console.log("Question created successfully");
        await Swal.fire({
          title: "Success!",
          text: "Question created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      } else {
        console.error("Failed to create question");
        await Swal.fire({
          title: "Error",
          text: "Failed to create question",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Error",
        text: "Failed to create question. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <Layout>
      <div className={classes.allContainer}>
        <div className={classes.question__container}>
          <div className={classes.question__wrapper}>
            <h3 className={classes.question__header__title}>
              <span className={classes.highlight}>
                Steps To Write A Good Question
              </span>
            </h3>

            <div className={classes.questionContainer}>
              <h2 className={classes.questionTitle}>
                How to Ask a Good Question
              </h2>
              <div className={classes.questionList}>
                <ul className={classes.questionListUl}>
                  <li >
                  
                    Summarize your problem in a one-line title.
                  </li>
                  <li >
                   
                    Describe your problem in more detail.
                  </li>
                  <li >
                  
                    Explain what you have tried and what you expected to happen.
                  </li>
                  <li >
                  
                    Review your question and post it to the site.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h4 className={classes.highlight}>Ask a Public Question</h4>
          <Link to="/">
                  <h5 className={classes.highlight}>
                    Go to Question page
                  </h5>
                </Link>
          <div className={classes.question__header__titleTwo}>
            <form onSubmit={handleSubmit} className={classes.question__form}>
              <input
                className={classes.question__title2}
                ref={titleDom}
                type="text"
                placeholder="Title"
                required
              />
              <textarea
                rows={4}
                className={classes.question__description}
                ref={descriptionDom}
                type="text"
                placeholder="Question Description..."
                required
              />
              <div className={classes.buttonContainer}>
                <button className={classes.question__button} type="submit">
                  Post Question
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AskQuestion;
