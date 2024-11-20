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

    const { friends,groups } = user;

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
