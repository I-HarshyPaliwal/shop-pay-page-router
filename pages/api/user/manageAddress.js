import auth from '@/middleware/auth';
import User from '@/models/User';
import db from '@/utils/db';
import { createRouter } from 'next-connect';
import { NextResponse } from 'next/server';
const router = createRouter();

router.use(auth);

router.put(async (req, res) => {
    try {
        db.connectDb();
        const { id } = req.body;
        let user = await User.findById(req.user);
        let user_addresses = user.address;
        let addresses = [];
        for (let i = 0; i < user_addresses.length; i++) {
            let temp_address = {};
            if (user_addresses[i]._id == id) {
                temp_address = { ...user_addresses[i].toObject(), active: true };
                addresses.push(temp_address);
            } else {
                temp_address = { ...user_addresses[i].toObject(), active: false };
                addresses.push(temp_address);
            }
        }

        // console.log("user_addresses", addresses);
        const newUserData = await user.updateOne(
            {
                address: addresses,
            },
            { new: true }
        );
        db.disConnectDb();
        // console.log("user_addresses", addresses);
        return res.json({ addresses });
        // console.log("Response", res.json({ addresses: addresses }))

        // return res.json({ name: "Harsh" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete(async (req, res) => {
    try {
        db.connectDb();
        const { id } = req.body;
        const user = await User.findById(req.user);
        await user.updateOne(
            {
                $pull: { address: { _id: id } },
            },
            { new: true }
        );
        db.disConnectDb();
        res.json({ addresses: user.address.filter((a) => a._id != id) });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler();