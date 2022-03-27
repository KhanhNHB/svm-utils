import React from 'react';
import { Container, Box } from '@mui/material';
import ContactTable from './contact-table/ContactTable';
import './css/contact.css'

const Contact = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Dữ liệu Liên hệ</h1>
      </Box>

      <ContactTable />
    </Container>
  );
};

export default Contact;