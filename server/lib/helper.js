


export const getOtherMember = (members, currentUserId) => members.find((member) => member._id.toString() !== currentUserId.toString())
