import { useState } from 'react';
import axios from 'axios';

// Define a constant variable for the Chat Engine project ID (You should replace it with your actual project ID)
const projectID = " 11a880eb-2922-49ae-9def-260e328ee01a";

const Modal = () => {
  // Define and initialize state variables for username, password, and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Define a function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page refresh)

    // Create an authentication object with Project-ID, User-Name, and User-Secret
    const authObject = { 'Project-ID': '11a880eb-2922-49ae-9def-260e328ee01a', 'User-Name': username, 'User-Secret': password };
    console.log(username); // Log the username to the console

    try {
      // Attempt to make an HTTP GET request to retrieve chats with provided authentication headers
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      // If the request is successful, store the username and password in localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      

      window.location.reload(); // Refresh the window
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError('Oops, incorrect credentials.'); // Set an error message in case of authentication failure
    }
  };

  // Return the JSX (user interface) for the Modal component
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          {/* Input fields for username and password */}
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            {/* Submit button */}
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        {/* Display error message, if any */}
        <h1>{error}</h1>
      </div>
    </div>
  );
};

// Export the Modal component for use in other parts of the application
export default Modal;
