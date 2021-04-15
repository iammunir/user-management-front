import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
  } from "@coreui/react";

export default function UserManagementTable({userData}) {
    const fields = ["id", "name", "username", "password"];
    
    // if (!userData) {
    //     return (
    //         <CSpinner
    //             color="primary"
    //             style={{width:'4rem', height:'4rem', position: 'absolute', left: '50%', top: '50%', translateX: '-50%', translateY: '-50%'}}
    //         />
    //     );
    // }

    return (
        <>
            <CCard>
                <CCardHeader>User Management</CCardHeader>
                <CCardBody>
                    <CDataTable
                    items={userData}
                    fields={fields}
                    dark
                    hover
                    striped
                    bordered
                    size="sm"
                    itemsPerPage={5}
                    pagination
                    />
                </CCardBody>
            </CCard>
        </>
      );
}
