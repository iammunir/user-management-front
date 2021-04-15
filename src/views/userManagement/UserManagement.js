import React, { useState, useEffect } from "react";
import {
    CRow,
    CCol,
    CButton,
    CLink,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CSpinner,
  } from "@coreui/react";
import UserManagementTable from './UserManagementTable';
import axios from "axios";

const URL = 'https://sharingvision-backend.herokuapp.com/user/';

export default function UserManagement() {
  
    useEffect(() => {
        const fetchingData = async () => {
            const dataResponse = await fetchData();
            setUserDataApi(dataResponse);
            setLoading(false);
        };
        fetchingData();
    }, []);

    const [userDataApi, setUserDataApi] = useState();
    const [userId, setUserId] = useState('');
    const [modal, setModal] = useState(false);
    const [modalResponse, setModalResponse] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');
    const [loading, setLoading] = useState(true);
    
    const toggleModal = () =>{
        setModal(!modal);
    };

    const toggleModalResponse = () =>{
        setModal(!modalResponse);
    };

    const fetchData = async () => {
        try {
            const {data} = await axios.get(URL + '20/1');
            const userData = data.data;
            return userData;
        } catch (error) {
            setResponseStatus('Error happened');
            setModalResponse(true);
            return null;
        }
    };

    const onDeleteHandler = async () => {
        setModal(false);
        setLoading(true);
        try {
            const {data} = await axios.delete(URL + userId);
            if(data.status) {
                const updatedUsersList = userDataApi.filter(user => user.id !== +userId);
                setUserDataApi(updatedUsersList);
                setResponseStatus('Delete success');
            } else {
                setResponseStatus('Delete failed');
            }
        } catch (error) {
            setResponseStatus('Delete failed');
        } finally {
            setLoading(false);
            setModalResponse(true);
        }
    }

    const spinner = (
        <CSpinner
                color="primary"
                style={{width:'4rem', height:'4rem', position: 'absolute', left: '50%', top: '50%', translateX: '-50%', translateY: '-50%'}}
            />
    );
    
    return (
        <>
            <CRow>
                <CCol col="12" sm="6" md="6" xl className="mb-3 mb-xl-3">
                        <CLink to="/user-management/form">
                            <CButton block color="primary">
                                    Create User
                            </CButton>
                        </CLink>
                </CCol>
                <CCol col="12" sm="6" md="6" xl className="mb-3 mb-xl-3">
                    <CButton block color="danger" onClick={toggleModal}>Delete User</CButton>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    {loading ? spinner : <UserManagementTable userData={userDataApi} />}
                </CCol>
            </CRow>
            <CModal
                show={modal}
                onClose={toggleModal}
            >
                <CModalHeader closeButton>
                    <h4>Delete User</h4>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup>
                            <CLabel>Please input user ID</CLabel>
                            <CInput type="number" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={onDeleteHandler}>Delete</CButton>
                    <CButton
                        color="secondary"
                        onClick={toggleModal}
                        >Cancel</CButton>
                    </CModalFooter>
            </CModal>
            <CModal
                show={modalResponse}
                onClose={toggleModalResponse}
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
