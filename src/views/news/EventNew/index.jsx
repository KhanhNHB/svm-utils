import React from 'react';
import { Container, Box } from '@mui/material';
import EventNewList from './EventNewList';

const EventNewListView = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 5 }}>
        <h1>Tin Tức Sự Kiện</h1>
      </Box>

      <EventNewList />
    </Container>
  );
};

export default EventNewListView;