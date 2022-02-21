import React from 'react';
import Button from "react-bootstrap/Button";

import chicken from "../../Assets/Avatars/chicken.png";
import dog from "../../Assets/Avatars/dog-face.png";
import panda from "../../Assets/Avatars/panda.png";
import tiger from "../../Assets/Avatars/tiger-face.png";
import unicorn from "../../Assets/Avatars/unicorn.png";

const Avatars = () => {

    return (

        <div className="d-flex justify-content-between mb-3 w-custom-limit-400">
            <Button className="bg-transparent p-0 h-100 border-secondary border-2 rounded-circle"><img src={chicken} alt={chicken} style={{width: "50px", height: "50px"}}/></Button>
            <Button className="bg-transparent p-0 h-100 border-secondary border-2 rounded-circle"><img src={dog} alt={dog} style={{width: "50px", height: "50px"}}/></Button>
            <Button className="bg-transparent p-0 h-100 border-secondary border-2 rounded-circle"><img src={panda} alt={panda} style={{width: "50px", height: "50px"}}/></Button>
            <Button className="bg-transparent p-0 h-100 border-secondary border-2 rounded-circle"><img src={tiger} alt={tiger} style={{width: "50px", height: "50px"}}/></Button>
            <Button className="bg-transparent p-0 h-100 border-secondary border-2 rounded-circle"><img src={unicorn} alt={unicorn}style={{width: "50px", height: "50px"}} /></Button>
        </div>
    );
};

export default Avatars;
