import Movie from '../../../models/Movie';

export default async (req, res) => {
   const { mvid, uid } = req.body;
   const movieData = await Movie.findById(mvid);

   try {
      if (movieData.likes.includes(uid)) {
         const movie = await Movie.updateOne(
            {
               _id: mvid,
               $inc: { likeCount: -1, dislikeCount: 1 },
               $pull: { likes: uid },
               $push: { dislikes: uid }
            }
         )
         res.status(200).json({ success: true, data: { movie } });
         return;
      } else if (movieData.dislikes.includes(uid)) {
         const movie = await Movie.update(
            {
               _id: mvid,
               $inc: { dislikeCount: -1 },
               $pull: { dislikes: uid }
            }
         )
         res.status(200).json({ success: true, data: { movie } });
         return;
      } else {
         const movie = await Movie.update(
            {
               _id: mvid,
               $inc: { dislikeCount: 1 },
               $push: { dislikes: uid }
            }
         )
         res.status(200).json({ success: true, data: { movie } });
         return;
      }
   } catch (error) {
      console.log(error);
      
      res.status(400).json({ success: false });
      return;
   }
}