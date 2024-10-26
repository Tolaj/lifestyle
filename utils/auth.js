import jwt from 'jsonwebtoken';


// Function to check if the token has expired

const checkTokenExpiration = () => {
    let token;
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  }

    const expirationTime = getTokenExpirationTime(token);
  
    // Compare the current time with the token's expiration time
    if (expirationTime && Date.now() >= expirationTime) {
      // Token has expired, perform logout actions
      logout();
    }
  };
  
  // Function to extract the expiration time from the token
  const getTokenExpirationTime = (token) => {
    if (!token) return null;
    
    const decodedToken = jwt.decode(token);
    if (!decodedToken.exp) return null;
  
    // Convert the expiration time to milliseconds
    const expirationTime = decodedToken.exp * 1000;
    return expirationTime;
  };

  const getTokenData = (token) => {
    if (!token) return null;
    
    const decodedToken = jwt.decode(token);
    if (!decodedToken) return null;
    
    return decodedToken;
  };
  
  // Logout function to clear the token and perform any other necessary actions
  const logout = () => {
    // Clear the token from storage
    localStorage.removeItem('token');
  
    // Redirect the user to the login page or perform other cleanup actions
    // ...
  };
  
  // Set up a timer or interval to periodically check the token's expiration

//   const expirationCheckTimer = setInterval(checkTokenExpiration, 1000);

const isUserSignedIn = () => {
    let token;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
  

  if (token) {
    try {
      // Decode the token and check the expiration date
      const decodedToken = jwt.decode(token);
      const expirationDate = new Date(decodedToken.exp * 1000);

      // Check if the token has expired
      if (expirationDate > new Date()) {
        return true; // User is signed in and token is valid
      }
    } catch (error) {
      // Handle token decoding error, if any
      console.error('Token decoding error:', error);
    }
  }else{
    return false
  }

  return false; // User is not signed in or token is expired
};

export {checkTokenExpiration,isUserSignedIn,getTokenData}