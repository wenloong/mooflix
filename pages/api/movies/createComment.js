import Movie from '../../../models/Movie';

export default async (req, res) => {
   const { username, userImage, comment, mvid } = req.body;

   try {
      const movie = await Movie.update(
         { _id: mvid },
         {
            $push: {
               comments: {
                  username: username,
                  userImage: userImage,
                  comment: comment
               }
            }
         }
      )

      res.status(200).json({ success: true, data: { movie } });
   } catch (error) {
      console.error(error);
      res.station(400).json({ success: false });
   }
}