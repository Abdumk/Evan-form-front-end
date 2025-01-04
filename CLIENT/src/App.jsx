import { createContext, useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "./utility/axios";
import AppRouter from "./routes/AppRouter.jsx";

export const UserState = createContext(); // Create a context for the user data

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("EV-Forum-token-Jun2024"); // Get the token stored during login from local storage
      if (!token) {
        navigate("/auth");
      }

      const userData = await axiosInstance
        .get("/users/check", { headers: { Authorization: "Bearer " + token } })
        .then((response) => response.data);
      console.log(userData);
      setUser(userData); // Store the user data in state so that it can be accessed by others too
    } catch (error) {
      console.log(error);
      navigate("/auth");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserState.Provider value={{ user, setUser }}>
      <AppRouter />
    </UserState.Provider>
  );
}

export default App;



// const express = require('express');

//          // db connection
// const dbconnection = require('./db/dbConfig')




// const app = express();
// const port = 5500


// // sample to test the server is working
// // app.get(`/`, (req, res)=> {
// // res.send("welcome")
// // })

// // user routes middleware file
// const useRoutes = require("./routes/userRoute")

// // user routes middleware 
// app.use("/app/users", useRoutes)

// // questions routes middleware ??


// // answers routes middleware ??

// async function start() {
//     try {
//     //   const result = await dbconnection.execute("select 'test' ") 
//     const [result] = await dbconnection.query("SELECT 'test' AS result");

//         console.log(result)
//        await app.listen(port)
//         console.log("database connection established")
//         // console.log(`listing on ${port}`)
//      } catch (error) {
//          console.log(error.message);
         
//      }
     
// }
//  start() 





// const mysql2 = require('mysql2');

// const dbconnection = mysql2.createPool({
//     user:"Evangadi-admin", 
//     database:"evangadi-forum",
//     host:"localhost",
//     password:"123456",
//     connectionLimit: 10
// })


// // when we insert data for  register,answer,question....will happen call backheal so we should turn to PROMISE based
// // dbconnection.execute( "select 'test' ", (err,result)=> {

// //     if(err) {
// //         console.log(err.message);
// //     }else{
// //         console.log(result);

// //     }
// // })


// module.exports = dbconnection.promise; 