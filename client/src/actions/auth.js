import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    // console.error(error);
    return {
      isSuccess: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    // console.log(error);
    return {
      isSuccess: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
