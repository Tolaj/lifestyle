import { useState, useEffect, useRef } from 'react';


export const useClickOutsideQuerySelector = (className, initialState = true) => {
    const [isVisible, setIsVisible] = useState(initialState);
  
    useEffect(() => {
      const handleClick = (event) => {
        // Check if the click is outside the specified class element
        if (!event.target.closest(`.${className}`)) {
          setIsVisible(false); // Hide the component if clicked outside
        }
      };
  
      document.addEventListener('mousedown', handleClick);
      
      // Cleanup the event listener on unmount
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }, [className]);
  
    return [isVisible, setIsVisible];
  };

export const useClickOutside = (ref=null) => {
    const [isVisible, setIsVisible] = useState(false);
    const isVisibleRef = ref?ref:useRef(null); 
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!isVisibleRef.current?.contains(event.target)) {
            setIsVisible(false); // Close the dropdown if clicked outside
          }else{
            setIsVisible(true);
          }
        };
        
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          // Clean up the event listener on unmount
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isVisibleRef]);
  
    return { isVisible, setIsVisible ,isVisibleRef};
  };


/**
 * Extracts and returns properties of the active group from a user's data based on groupId.
 * 
 * @param {Object} user - The user object containing group data.
 * @param {String} groupId - The ID of the active group to extract.
 * @returns {Object|null} - An object containing the properties of the active group or null if not found.
 */
export function getUserGroupDetails(user, groupId) {
    if (!user || !groupId) {
        console.error("Invalid user or groupId provided");
        return null;
    }

    const { friends, groups } = user;

    // Find the active group based on groupId
    const activeGroup = groups?.find(group => group._id === groupId);
    if (!activeGroup) {
        console.error("Group not found for the given groupId");
        return null;
    }

    const activeGroupMembers = friends.filter(friend =>
        activeGroup.members.includes(friend.requester._id)
    ).map(friend => friend.requester);

    activeGroupMembers.push(user);
    
    return {
        friends,
        activeGroup,
        activeGroupMembers,
        // activeGroupWishLists,
        // activeGroupBudget,
        // activeGroupCategories,
        // activeGroupInventory,
        // activeGroupOrders,
        // activeGroupProducts,
        // activeGroupResourcePlans,
    };
}

/**
 * Returns a human-readable "time ago" string for a given date.
 * 
 * @param {String|Date} dateString - The date to be converted into a "time ago" format.
 * @returns {String} - A string representing the time elapsed since the given date.
 */
export function TimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / (3600 * 24));
    const months = Math.floor(days / 30);
    
    if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
        return "Just now";
    }
}
