import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import axios from 'axios';

const Content = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_GP_API_URL)
    .then((res) => {
        
        console.log(posts);
        setPosts();
    })
    .catch((error) => {
      console.log(error);
    });
});
// + .map -->
  return (
    <Container fluid>
      <section>
        <h1 className="fs-2">Lorem ipsum dolor sit amet.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quidem ratione excepturi, sapiente eius tenetur suscipit alias modi natus dolores ex, error inventore voluptates earum saepe maxime praesentium consectetur culpa!</p>

        <div className="mb-3">
          <img src="" alt="" />
          Image is here
        </div>
      </section>
    </Container>
  );
};

export default Content;
