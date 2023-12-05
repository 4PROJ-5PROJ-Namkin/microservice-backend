
import React, { useEffect } from 'react';
import "../styles/Inscription.css";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol,
}
    from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { useMutation, useLazyQuery, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
    mutation Create(
        $capaciter: String!,
        $professeur_Id: String!, 
        $listEleves: String!, 
        $name: String!
        ) {
        create(createClassInput: {capaciter: $capaciter, listEleves: $listEleves, name: $name, professeur_Id: $professeur_Id}) 
        {
            capaciter
            id
            listEleves
            name
            professeur_Id
        }
    }
    
`;
const FIND_PROFESSOR_BY_NAME_QUERY = gql`
    query findOneUserByName($lastName: String!) {
        findOneUserByName(lastName: $lastName) {
            id
        }
    }
`;




export default function Ajout() {
    useEffect(() => {
        if(!isAdmin()){
            window.location.replace('/');
            throw new Error('Page interdite');
        }
    }, []);

    const [createLink, { data }] = useMutation(CREATE_LINK_MUTATION);

    const [findProfessorByName] = useLazyQuery(FIND_PROFESSOR_BY_NAME_QUERY, {
        onCompleted: (data) => {
            if (data && data.findProfessorByName && data.findProfessorByName.id) {
                // Once we have the professor ID, we can create the class
                const profId = data.findProfessorByName.id;
                createClass(profId);
            } else {
                // Handle error: Professor not found
                alert("error");
            }
        }
    });

    
    const createClass = (profId) => {
        var nom = document.getElementById('Nom').value;
        var capacity = document.getElementById('capacite').value;
        var listEleves = document.getElementById('listEleves').value;

        createLink({
            variables: {
                capaciter: capacity,
                name: nom,
                professeur_Id: profId,
                listEleves: listEleves
            }
        });
    };
    const Register = () => {
        var professorName = document.getElementById('professorName').value;

        // First, we find the professor ID by their name
        // findProfessorByName({
        //     variables: {
        //         lastName: professorName
        //     }
        // });
        createClass("66966e8c-b962-4976-be4a-f60e58fd4a25");
    };


    return (
        <MDBContainer fluid className='my-5' >
            <MDBRow className='g-0 align-items-center container' style={{ margin: "auto", width: "65vw" }}>
                <MDBCol col='6'>
                    <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <h2 className="fw-bold mb-5">Ajout d'une classe</h2>
                            <div className='flexed'>
                                <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Nom' id='Nom' type='text' />
                                <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Capacité' id='capacite' type='number' />
                            </div>
                            <MDBInput wrapperClass='mb-4' label='Nom du professeur' id='professorName' type='text' />
                            <MDBInput wrapperClass='mb-4' label='Liste des élèves' id='listEleves' type='text' />
                            <MDBBtn className='w-100 mb-4' size='md' onClick={Register}>Valider</MDBBtn>
                            <div className="alert alert-success nodisplay" role="alert">
                                <p>Compte créé avec succès</p>
                                <Link to={"/Connection"}>Me connecter</Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

function isAdmin() {
    var token = localStorage.getItem("token");
    if (token === null || token === "disconnected") {
        return false;
    }
    var decoded = jwtDecode(token);
    if (decoded.role === "student") {
        return true;
    }
    return false;

}
