import Session from '../../../models/Session';

export default async (req, res) => {
   const { method } = req;

   switch (method) {
      case 'GET':
         try {
            const sessions = await Session.find({});

            res.status(200).json({ success: true, data: sessions });
         } catch (error) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
         break;
   }
}