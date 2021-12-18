import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Oops, cette page n'existe pas</h1>
            <button className="btn btn-primary" onClick={() => navigate("/")}>Retourner à la page d'accueil</button>
        </div>
    )
}
