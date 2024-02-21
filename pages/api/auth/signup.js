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
        // Password cryption is done
        const newUser = new User({ name, email, password: cryptedPassword });
        // New user document created
        const addedUser = await newUser.save();
        // New user document added to the database

        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        });
        // This is taking "_id" from mongodb addedUser (response sent from mongodb) (this is the document that is being saved in mongodb) | converting it to a string | and pass it as a value to a key "id" in a object | That object is passed to "createActivationToken" method to create a activation token


        const url = `${process.env.BASE_URL}/activate/${activation_token}`

        // The mail functionality is not working 
        // sendEmail(email, url, "", "Summer Collection Offer")

        // res.send(url);
        // res.status(200).json({ message: "Data recieved successfully" })

        await db.disConnectDb();
        res.json({ message: "Register Success ! Please activate your email to start" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
export default router.handler()
