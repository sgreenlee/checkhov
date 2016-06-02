var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ProjectConstants = require("../constants/projectConstants");

var ProjectStore = new Store(AppDispatcher);

ProjectStore.__onDispatch = function (payload) {

}

module.exports = ProjectStore;
