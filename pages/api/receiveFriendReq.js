import User from 'models/User';
import { createHandler } from '../../controllers/genericHandler';
import parseFormData from 'utils/parseFormData';
import Group from 'models/Group';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function receiveFriendRequest(userId, friendId, action) {
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return { message: 'User or friend not found' };
    }

    let message;

    let isInGroup;
    switch (action) {
      case "DELETE":
        isInGroup = await Group.exists({ members: friendId });
    
        if (isInGroup) {
            // If the user is a member of any group, prevent removal from friends
            message = 'Cannot delete friend: user is a member of one or more groups.';
            break;
        }
        user.friends = user.friends.filter(
          (f) => f.requester.toString() !== friendId
        );
    
        // Remove user from friend's friends array
        friend.friends = friend.friends.filter(
          (f) => f.requester.toString() !== userId
        );
        
        await user.save();
        await friend.save();

        message= 'Friend removed!'
        break;
      
      case "ACCEPTED":
        user.friends = user.friends.map((f) =>
          f.requester.toString() === friendId.toString()
            ? { ...f, status: 'ACCEPTED' }
            : f
        );
    
          // Check if `userId` exists in `friend.friends`
        const userInFriendList = friend.friends.find((f) => f.requester.toString() === userId.toString());
        
        if (userInFriendList) {
          // If `userId` is in `friend.friends`, update the status to 'ACCEPTED'
          friend.friends = friend.friends.map((f) =>
            f.requester.toString() === userId.toString()
              ? { ...f, status: 'ACCEPTED' }
              : f
          );
        } else {
          // If `userId` is not in `friend.friends`, add it with status 'ACCEPTED'
          friend.friends.push({ requester: userId, status: 'ACCEPTED' });
        }
    
        await user.save();
        await friend.save();
    
        message= 'Friend accepted!'
        break;
      
      case "REJECTED":
        isInGroup = await Group.exists({ members: friendId });
    
        if (isInGroup) {
            // If the user is a member of any group, prevent removal from friends
            message = 'Cannot reject friend: user is a member of one or more groups.';
            break;
        }
        user.friends = user.friends.map((f) =>
            f.requester.toString() === friendId.toString()
              ? { ...f, status: 'REJECTED' }
              : f
        );
      
        friend.friends = friend.friends.filter(
          (f) => f.requester.toString() !== userId
        );
         
      
        await user.save();
        await friend.save();
      
        message= 'Friend rejected!'
        break;
    
      default:
        return { message: 'No Such Action' }
    }

    return { message: message };



  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
}

const customMiddleware = async (req, res) => {
  const fields  = req.body
  
  const response = await receiveFriendRequest(fields.userId, fields.friendId,fields.action);
  if (response.message === 'Friend removed!' || 
      response.message === 'Friend accepted!' || 
      response.message === 'Friend rejected!') {
     res.status(200).json(response); 
     return "ok"
  } else {
     res.status(400).json({ success: false, message: response.message });
    return "ok"
  }

};

export default createHandler(User, {
  useAuth: false, 
  middleware: customMiddleware, 
});
