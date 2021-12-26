import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Header from "../Components/Profile/Header.jsx";
import Content from "../Components/Profile/Content.jsx";
import userService from "../services/userService.js";

const Profile = () => {
  const [user, setUser] = useState([]);

  const {id} = useParams();
 
  useEffect(() => {
    userService
      .getOneUser(id)
      .then((response) => {
        console.log(response);
        const data = response.data;
       
        setUser(data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="w-custom-limit-800">
      <Header/>
      <Content userId={user.u_id} firstName={user.u_first_name} lastName={user.u_last_name} email={user.u_email} password={user.u_password}/>
    </Container>
  );
};

export default Profile;
