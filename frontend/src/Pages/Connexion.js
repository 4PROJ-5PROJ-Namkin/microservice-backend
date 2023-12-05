import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import axios from "axios";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Container } from 'react-bootstrap';
import { loginRequest } from './sso';



export default function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        if (trigger) {
            login (email, password)
                .then(data => {
                    localStorage.setItem("token",  data.data);
                    window.location.replace("/profil");
                })
                .catch(error => {
                })
                .finally(() => {
                    setTrigger(false); // Reset trigger here
                });
        }
    }, [trigger, email, password]); // Trigger login when 'trigger' state changes
    const connect = () => {
        document.getElementsByClassName('err-mdp')[0].style.display = "none";
        document.getElementsByClassName('err-logs')[0].style.display = "none";
        setEmail(document.getElementById('mail').value);
        setPassword(document.getElementById('mdp').value);
        setTrigger(true);
    }

    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const handleSSO = () => {
        instance
            .loginRedirect({
                ...loginRequest,
                prompt: 'create',
            })
            .catch((err) => console.log(err));
    }   


    return (
        <MDBContainer fluid className="p-3 my-5 h-custom container reducesize">

            <MDBRow className='customRow'>
                <MDBCol col='4' md='6'>
                    <MDBInput wrapperClass='mb-4' label='Mail' id='mail' type='email' size="lg" />
                    <MDBInput wrapperClass='mb-4' label='Mot de passe' id='mdp' type='password' size="lg" />
                    <div className="alert alert-warning nodisplay err-mdp" role="alert">
                        Le mot de passe n'est pas assez fort
                    </div>
                    <div className="alert alert-warning nodisplay err-logs" role="alert">
                        Identifiant ou mot de passe incorrect!
                    </div>
                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className='w-100 mb-4' size='md' onClick={connect}>Valider</MDBBtn>
                        <p className="small mt-2 pt-1 mb-2">Pas encore de compte ? <Link to={"/Inscription"}>Inscription</Link></p>
                    </div>

                </MDBCol>

            </MDBRow>
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <Container>
                        <div>efzfzefzef</div>
                    </Container>
                ) : "eafef"}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <button onClick={handleSSO}>
                    Sign up
                </button>
            </UnauthenticatedTemplate>
        </MDBContainer>
        
    );
}

export const login = async (mail, pass) => {
    const body = {
        email : mail,
        password: pass
    }
    const res = await axios.post('http://localhost:3000/login', body);
    return res;
}
