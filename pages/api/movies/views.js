import Movie from '../../../models/Movie';

export default async (req, res) => {
    const { mvid } = req.body;
    console.log("THIS IS MVID" + mvid);

    try {
        const movie = await Movie.findByIdAndUpdate(
            { _id: mvid },
            { $inc: { views: 1 }}
        )
        res.status(200).json({ success: true, data: { movie } });
        return;

    } catch (error) {
        console.log(error);

        res.status(400).json({ success: false });
        return;
    }
}