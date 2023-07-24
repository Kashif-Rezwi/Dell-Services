import { LOGOUT_AUTH_REQUEST, POST_AUTH_SUCCESS } from "./actionTypes";

// POST ACTIONS

export const AuthSuccessAction = (payload) => {
  return { type: POST_AUTH_SUCCESS, payload };
};

export const LogoutRequestAction = () => {
  return { type: LOGOUT_AUTH_REQUEST };
};
