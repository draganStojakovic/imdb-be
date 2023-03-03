import { iUser } from 'types/iUser';

export const sanitizeUser = (user: iUser) => {
  return {
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  };
};

export const sanitizeError = (
  message: string,
  status: number,
  location = 'body'
) => {
  return {
    success: false,
    errors: [
      {
        message,
        status,
        location,
      },
    ],
  };
};
