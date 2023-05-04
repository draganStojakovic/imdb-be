import { Request, Response } from 'express';
import { sanitizeError, sanitizeUploadedPosterLinks } from 'util/sanitizers';
import { Poster } from 'database/schemas/Poster';

export const insertLinksOfUploadedImages = async (
  req: Request,
  res: Response
) => {
  try {
    const images = await Poster.create(req.session.poster);

    return res.status(201).json(sanitizeUploadedPosterLinks(images));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
