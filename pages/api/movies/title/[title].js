import Movie from '../../../../models/Movie';

export default async (req, res) => {
   const {
      query: { title },
      method
   } = req;

   switch (method) {
      case 'GET':
         try {
            const movie = await Movie.find({ "title": title });

            if (!movie) {
               return res.status(400).json({ success: false });
            }
            
            res.status(200).json({ success: true, data: movie });
         } catch (error) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
         break;
   }
}