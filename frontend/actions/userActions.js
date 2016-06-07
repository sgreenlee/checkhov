var UserApiUtil = require("../util/userApiUtil");

var UserActions = {
  createUser: UserApiUtil.createUser,
  updateUser: UserApiUtil.updateUser,
  updateProfile: UserApiUtil.updateProfile
};

module.exports = UserActions;
