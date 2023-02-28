import { iUser } from "types/iUser";

export const sanitizeUser = (user: iUser) => {
  return {
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  };
};