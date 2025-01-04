import styles from "./questionCard.module.css";
import { MdAccountCircle } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from 'moment';
import { LuCalendarClock } from "react-icons/lu";
import  { useContext,useState } from "react";
import { UserState } from "../../App.jsx";
import { axiosInstance } from "../../utility/axios.js";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function QuestionCard({ id,userid,userName, questionTitle,description,question_date ,onDelete, onEdit}) {
  const formattedDate = moment(question_date).format('ddd, MMM DD, YYYY h:mm A').toUpperCase();
          {/* from cop */} 
           
  const {user}=useContext(UserState);
  const userId = user?.userid;

  console.log("userid from props:", userid);
console.log("userId from context:", userId);


  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(questionTitle);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEdit = () => {
    const payload = {
      title,
      description: editedDescription,
      userId,
    };

    axiosInstance
      .put(`/question/${id}`, payload)
      .then((response) => {
        if (onEdit) onEdit(id, response.data); // Update parent state
        return Swal.fire({
          title: "Success!",
          text: "Question edited successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Edit Error:", error.response?.data || error.message);
        Swal.fire({
          title: "Error",
          text: "Failed to edit the question. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleDelete = () => {
    // Show confirmation modal
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Notify the parent about the delete event
        if (onDelete) onDelete(id);
      }
    });
  };

const handleCardClick = (e) => {
  if (isEditing) {
    // Prevent navigation while editing
    e.preventDefault();
  }
};


          {/* from cop */}

  return (
    <div className={styles.question_holder}>
    {!isEditing && (
    <Link to={`/question/${id}`} style={{textDecoration:"none" ,color:"black"}} onClick={handleCardClick}>
  
        <div className={styles.requester_question_holder}>
            <div className={styles.requester_holder}>
              <MdAccountCircle size={50} />
              <div>{userName}</div>
            </div>

            <div className={styles.title_description_holder}>
              <p className={styles.question_title}>{String(questionTitle).length>100? String(questionTitle).substring(0, 100).concat(". . .") : questionTitle}</p>
              <p className={styles.question_description}>{String(description).length>300? String(description).substring(0, 300).concat(". . .") : description}</p>
              <p className={styles.question_date}><LuCalendarClock style={{marginRight:"5px"}} />{formattedDate}</p>
            </div>
          </div>

          <div className={styles.question_arrow_holder}>
            <div>
              <FaChevronRight size={23} />
            </div>
          </div>
          
          </Link>
        
    )}
      {String(userid) === String(userId) && (
        <div>
          {isEditing ? (
            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Edit title"
                onClick={(e) => e.stopPropagation()} // Prevent navigation
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Edit description"
                onClick={(e) => e.stopPropagation()} // Prevent navigation
              />
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation
                  handleEdit();
                }}
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {/* <h3>{questionTitle}</h3> */}
              {/* <p>{description}</p> */}
              <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigation
          setIsEditing(true);
        }}
        className={styles.editButton}
      >
        <FaEdit size={18} style={{ marginRight: "8px" }} /> Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigation
          handleDelete();
        }}
        className={styles.deleteButton}
      >
        <FaTrashAlt size={18} style={{ marginRight: "8px" }} /> Delete
      </button>
            </div>
                   )}
                   </div>
                 )}
               </div>
             );
           }
           
           
export default QuestionCard;

