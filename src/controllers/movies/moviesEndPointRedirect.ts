import { Request, Response } from 'express';

export const moviesEndPointRedirect = (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    search = undefined,
    genres = undefined,
  } = req.query;

  if (page && limit && !search && !genres) {
    return res.redirect(
      req.baseUrl + `/movies-paginated?page=${page}&limit=${limit}`
    );
  } else if (page && limit && search && !genres) {
    return res.redirect(
      req.baseUrl +
        `/movies-paginated-search?page=${page}&limit=${limit}&search=${search}`
    );
  } else if (page && limit && search && genres) {
    return res.redirect(
      req.baseUrl +
        `/movies-paginated-search-genres?page=${page}&limit=${limit}&search=${search}&genres=${genres}`
    );
  } else if (page && limit && genres && !search) {
    return res.redirect(
      req.baseUrl +
        `/movies-paginated-genres?page=${page}&limit=${limit}&genres=${genres}`
    );
  }
};
