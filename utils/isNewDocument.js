export default function IsNewDocument(createdAt) {
    // Convert the createdAt timestamp to a Date object
    const createdTime = new Date(createdAt);
  
    // Get the current time
    const currentTime = new Date();
  
    // Calculate the difference in milliseconds
    const timeDifference = currentTime - createdTime;
  
    // Convert milliseconds to minutes and check if it's less than or equal to 1 minute
    const minutesDifference = timeDifference / 1000 / 60;
  
    return minutesDifference <= 1;
  }