import User from 'models/User';
import { createHandler } from '../../controllers/genericHandler';
import parseFormData from 'utils/parseFormData';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function sendFriendRequest(userId, friendEmail) {
  try {
    // Find the friend by their email
    const friend = await User.findOne({ email: friendEmail.toLowerCase() });
    if (!friend) {
      return { message: "Friend not found with the provided email!" };
    }
    
    
    // Find the current user
    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found" };
    }

    if(friendEmail == user.email){
      return { message: "Can not send friend request to yourself!" };
    }

    const existingFriend = friend.friends.some(
      (f) => f.requester.toString() === user._id.toString() && f.status === 'ACCEPTED'
    );

    if(existingFriend){
      return { message: "Already Friend!" };
    }

    const existingFriendRejection = friend.friends.some(
      (f) => f.requester.toString() === user._id.toString() && f.status === 'ACCEPTED'
    );

    if(existingFriendRejection){
      return { message: "Friend request rejected!" };
    }

    // Check if there's already a pending request from the user to the friend
    const existingRequestToFriend = friend.friends.some(
      (f) => f.requester.toString() === user._id.toString() && f.status === 'PENDING'
    );

    if (existingRequestToFriend) {
      return { message: "Friend request already exists!" };
    }

    // Check if there's already a pending request from the friend to the user
    const existingRequestFromFriend = user.friends.some(
      (f) => f.requester.toString() === friend._id.toString() && f.status === 'PENDING'
    );

    if (existingRequestFromFriend) {
      // Accept the existing request
      user.friends = user.friends.map((f) =>
        f.requester.toString() === friend._id.toString()
          ? { ...f, status: 'ACCEPTED' }
          : f
      );

      friend.friends.push({
        requester: user._id,
        status: 'ACCEPTED',
        timestamp: new Date()
      });

      await user.save();
      await friend.save();

      return { message: "Friend request accepted!" };
    }

    // Create a new friend request in the friend's friends array
    friend.friends.push({
      requester: user._id,
      status: 'PENDING',
      timestamp: new Date()
    });

    await friend.save();
    return { message: "send" };
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
}

const customMiddleware = async (req, res) => {
  const { fields } = await parseFormData(req);
  const response = await sendFriendRequest(fields._id, fields.friendEmail);
  if(response.message == 'send'){
    res.status(200).json(response);
  }else{
    res.status(400).json({ success: false, message: response.message });
  }

};

export default createHandler(User, {
  useAuth: false, 
  middleware: customMiddleware, 
});
