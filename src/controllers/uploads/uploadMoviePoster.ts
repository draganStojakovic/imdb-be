import { Request, Response } from 'express';
import { sanitizeError, sanitizeUploadedPosterLinks } from 'util/sanitizers';
import { Poster } from 'database/schemas/Poster';

export const uploadMoviePoster = async (req: Request, res: Response) => {
  try {
    const linksToImages = req.session.poster;
    const images = await Poster.create(linksToImages);
    req.session.poster = null;
    return res.status(201).json(sanitizeUploadedPosterLinks(images));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
