import auth from '@/middleware/auth';
import User from '@/models/User';
import db from '@/utils/db';
import { createRouter } from 'next-connect';
const router = createRouter();

router.use(auth);

router.post(async (req, res) => {
    try {
        db.connectDb();
        const { address } = req.body;
        // console.log("request", req.body);
        const user = await User.findById(req.user);
        // console.log("User", user);
        let newUserData = await user.updateOne({
            $push: {
                address: address,
            },
        }, { new: true });
        db.disConnectDb();
        return res.json({ addresses: address });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler();