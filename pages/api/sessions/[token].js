import Session from '../../../models/Session';

export default async (req, res) => {
   const {
      query: { token },
      method
   } = req;

   switch (method) {
      case 'GET':
         try {
            const userSession = await Session.find({ accessToken: token });

            if (!userSession) {
               return res.status(400).json({ success: false });
            }

            res.status(200).json({ success: true, data: userSession });
         } catch (error) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
         break;
   }
}