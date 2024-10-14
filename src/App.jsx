// src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from './store/chatSlice';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage({ text: input, timestamp: new Date().toLocaleTimeString() }));
      setInput('');
      // Simulate receiving a message
      setTimeout(() => {
        dispatch(receiveMessage({ text: 'Mock response', timestamp: new Date().toLocaleTimeString() }));
      }, 1000);
    }
  };

  return (
    <Container maxWidth="md" className="py-4">
      <Typography variant="h4" align="center" gutterBottom>
        Chat Application
      </Typography>
      <Paper elevation={3} className="h-96 p-4 overflow-auto">
        {messages.map((msg, index) => (
          <Box key={index} className="mb-2">
            <Typography variant="body1">{msg.text}</Typography>
            <Typography variant="caption" color="textSecondary">{msg.timestamp}</Typography>
          </Box>
        ))}
      </Paper>
      <Box display="flex" mt={2}>
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button variant="contained" color="primary" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default App;
