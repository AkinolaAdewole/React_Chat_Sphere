import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

// Define a functional component named MessageForm
const MessageForm = (props) => {
  // Initialize a state variable 'value' and a function 'setValue' to update it using the 'useState' hook
  const [value, setValue] = useState('');
  const { chatId, creds } = props; // Destructuring props for ease of use

  // Handle changes in the message input field
  const handleChange = (event) => {
    // Update the 'value' state with the current value of the input field
    setValue(event.target.value);

    // Notify the chat engine that the user is typing
    isTyping(props, chatId);
  };

  // Handle form submission when the user clicks the send button
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const text = value.trim(); // Trim leading and trailing whitespace from the message

    // Check if the trimmed message is not empty
    if (text.length > 0) {
      // Send the message using the 'sendMessage' function provided by the chat engine
      sendMessage(creds, chatId, { text });
    }

    // Clear the message input field by resetting the 'value' state
    setValue('');
  };

  // Handle file uploads
  const handleUpload = (event) => {
    // Send the uploaded files as a message using the 'sendMessage' function, including any provided text
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  // Render the message input form
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value} // Bind the input value to the 'value' state
        onChange={handleChange} // Call the 'handleChange' function when the input changes
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)} // Call the 'handleUpload' function when a file is selected
      />
      <button type="submit" className="send-button" onSubmit={handleSubmit}>
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

// Export the MessageForm component for use in other parts of the application
export default MessageForm;
