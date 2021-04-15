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
  CSpinner
} from "@coreui/react";
import axios from "axios";

const URL = 'https://sharingvision-backend.herokuapp.com/user/'

export default function UserManagementForm() {

    const [valName, setValName] = useState('');
    const [valUsername, setValUsername] = useState('');
    const [valPassword, setValPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');

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
        setValUsername('');
        setValPassword('');
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
                        <CInput type="text" name="name" value={valName} onChange={(e) => setValName(e.target.value)} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Username</CLabel>
                        <CInput type="text" name="username" value={valUsername} onChange={(e) => setValUsername(e.target.value)} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Password</CLabel>
                        <CInput type="password" name="password" value={valPassword} onChange={(e) => setValPassword(e.target.value)} />
                    </CFormGroup>

                    <div className="form-actions">
                        <CButton onClick={submitHandler} color="primary" style={{marginRight: '1rem'}}>
                        Create
                        </CButton>
                        <CLink to="/user-management">
                        <CButton color="secondary">Cancel</CButton>
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
