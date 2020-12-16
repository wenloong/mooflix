import Movie from '../../../../models/Movie';

export default async (req, res) => {
   const {
      query: { genre },
      method
   } = req;

   switch (method) {
      case 'GET':
         try {
            if (genre === 'Action') {
               const movie = await Movie.find({genre: { $elemMatch: { $eq: genre }}});

               if (!movie) {
                  return res.status(400).json({ success: false });
               }
   
               res.status(200).json({ success: true, actionData: movie });
            } else if (genre === 'Horror') {
               const movie = await Movie.find({genre: { $elemMatch: { $eq: genre }}});
   
               if (!movie) {
                  return res.status(400).json({ success: false });
               }
   
               res.status(200).json({ success: true, horrorData: movie });
            } else if (genre === 'Fantasy') {
               const movie = await Movie.find({genre: { $elemMatch: { $eq: genre }}});
   
               if (!movie) {
                  return res.status(400).json({ success: false });
               }
   
               res.status(200).json({ success: true, fantasyData: movie });
            }
         } catch (error) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
         break;
   }
}