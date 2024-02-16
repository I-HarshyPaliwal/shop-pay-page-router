import db from "@/utils/db";
import { validateEmail } from "@/utils/validation";
import { createRouter } from "next-connect"
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

        res.status(200).json({ message: "Data recieved successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
export default router.handler()
