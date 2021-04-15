import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CLink,
  CModal,
  CModalBody,
  CSpinner,
  CInvalidFeedback
} from "@coreui/react";
import axios from "axios";

const URL = 'https://sharingvision-backend.herokuapp.com/user/'

export default function UserManagementForm() {

    const [valName, setValName] = useState('');
    const [valUsername, setValUsername] = useState('');
    const [valPassword, setValPassword] = useState('');
    const [validName, setValidName] = useState();
    const [validUsername, setValidUsername] = useState();
    const [validPassword, setValidPassword] = useState();

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');

    const validateName = (event) => {
        const name = event.target.value.trim();
        setValName(name)
        if (name.length < 3) {
            setValidName(false);
        } else {
            setValidName(true);
        }
    };
    const validateUsername = (event) => {
        const username = event.target.value.trim();
        setValUsername(username)
        if (username.length < 3) {
            setValidUsername(false);
        } else {
            setValidUsername(true);
        }
    };
    const validatePassword = (event) => {
        const password = event.target.value.trim();
        setValPassword(password)
        if (password.length < 7) {
            setValidPassword(false);
        } else {
            setValidPassword(true);
        }
    };

    const toggleModal = () =>{
        setModal(!modal);
    }

    const submitHandler = async (event) => {
        setLoading(true);
        event.preventDefault();
        const newUser = {name: valName, username: valUsername, password: valPassword};
        
        const newUserJson = JSON.stringify(newUser);
        try {
            const {data} = await axios.post(URL, newUserJson, {headers: {'Content-Type': 'application/json'}})
            if(data.status){
                setResponseStatus('Successfully added a new user');
            } else {
                setResponseStatus('Failed added a new user');
            }
        } catch (error) {
            setResponseStatus('Failed added a new user');
        } finally {
            setLoading(false)
        }
        setModal(true);
        setValName('');
        setValidName(false);
        setValUsername('');
        setValidUsername(false);
        setValPassword('');
        setValidPassword(false);
    };

    if (loading) {
        return (
            <CSpinner
                color="primary"
                style={{width:'4rem', height:'4rem', position: 'absolute', left: '50%', top: '50%', translateX: '-50%', translateY: '-50%'}}
            />
        );
    }

    return (
        <>
        <CRow>
            <CCol xs="12">
                <CCard>
                <CCardHeader>Create User</CCardHeader>
                <CCardBody>
                    <CForm className="form-horizontal">
                    <CFormGroup>
                        <CLabel>Name</CLabel>
                        <CInput type="text" valid={validName} invalid={!validName} name="name" value={valName} onChange={validateName} />
                        {validName ? '' : <CInvalidFeedback>Minimum 3 chars are required</CInvalidFeedback>}
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Username</CLabel>
                        <CInput type="text" valid={validUsername} invalid={!validUsername} name="username" value={valUsername} onChange={validateUsername} />
                        {validUsername ? '' : <CInvalidFeedback>Minimum 3 chars are required</CInvalidFeedback>}
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Password</CLabel>
                        <CInput type="password" valid={validPassword} invalid={!validPassword} name="password" value={valPassword} onChange={validatePassword} />
                        {validPassword ? '' : <CInvalidFeedback>Minimum 7 chars are required</CInvalidFeedback>}
                    </CFormGroup>

                    <div className="form-actions">
                        <CButton onClick={submitHandler} disabled={!validName || !validUsername || !validPassword} color="info" style={{marginRight: '1rem'}}>
                        Create
                        </CButton>
                        <CLink to="/user-management">
                        <CButton color="secondary" >Cancel</CButton>
                        </CLink>
                    </div>
                    </CForm>
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CModal
            show={modal}
            onClose={toggleModal}
        >
            <CModalBody>
                <h4>
                    {responseStatus}
                </h4>
            </CModalBody>
        </CModal>
        </>
    );
}
