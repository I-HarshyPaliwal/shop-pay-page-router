import User from "@/models/User";
import db from "@/utils/db";
import bcrypt from 'bcrypt'
import { validateEmail } from "@/utils/validation";
import { createRouter } from "next-connect"
import { createActivationToken } from "@/utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
const router = createRouter()
router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "InValid Email" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "This user already exists" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" })
        }

        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: cryptedPassword });
        const addedUser = await newUser.save();
        const activation_token = createActivationToken({
            id: addedUser._id.toString(),

        });
        const url = `${process.env.BASE_URL}/activate/${activation_token}`

        // The mail functionality is not working 
        // sendEmail(email, url, "", "Summer Collection Offer")

        // res.send(url);
        // res.status(200).json({ message: "Data recieved successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
export default router.handler()
