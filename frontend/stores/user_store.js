var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    UserConstants = require('../constants/session_constants');

var UserStore = new Store(AppDispatcher);

var _users = {};

var resetUsers = function(users) {
  _users = {};

  users.forEach(function(user) {
    _users[user.id] = user;
  });
};

UserStore.all = function() {
  return Object.keys(_users).map(function(userId) {
    return _users[userId];
  });
};

UserStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_USERS:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
  }
};
