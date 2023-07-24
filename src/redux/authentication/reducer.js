import { deleteData, loadData, saveData } from "../../utils/accessLacalStorage";
import { LOGOUT_AUTH_REQUEST, POST_AUTH_SUCCESS } from "./actionTypes";

const initialState = {
  firstName: loadData("UserDetails")?.firstName || "",
  lastName: loadData("UserDetails")?.lastName || "",
  email: loadData("UserDetails")?.email || "",
  token: loadData("UserDetails")?.token || null,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //LOGIN
    case POST_AUTH_SUCCESS: {
      saveData("UserDetails", payload);
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        token: payload.token,
      };
    }
    //LOGOUT
    case LOGOUT_AUTH_REQUEST: {
      deleteData("UserDetails");
      return initialState;
    }
    default:
      return state;
  }
};
