import { Request, Response } from 'express';
import { sanitizeError, sanitizeDeletedPosterLinks } from 'util/sanitizers';
import { Poster } from 'database/schemas/Poster';

export const removeLinksOfUploadedImages = async (
  req: Request,
  res: Response
) => {
  try {
    const { posterId } = req.query;
    const deletedLinks = await Poster.findByIdAndDelete(posterId);

    return res.status(200).json(sanitizeDeletedPosterLinks(deletedLinks));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
