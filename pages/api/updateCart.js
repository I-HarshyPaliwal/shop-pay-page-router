import Product from '@/models/Product';
import db from '@/utils/db';
import { createRouter } from 'next-connect';
const router = createRouter();

router.get(async (req, res) => {
    try {
        db.connectDb();
        const promises = req.body.products.map(async (p) => {
            let dbProduct = await Product.findById(p._id).lean();
            let originalPrice = dbProduct.subProducts[p.style].sizes.find((x) => x.size == p.size).price;
            let quantity = dbProduct.subProducts[p.style].sizes.find((x) => x.size == p.size).qty;
            let discount = dbProduct.subProducts[p.style].discount;

            return {
                ...p,
                priceBefore: originalPrice,
                price: discount > 0 ? (originalPrice - originalPrice / discount) : originalPrice,
                discount: discount,
                shipping: dbProduct.shipping,
            }
        });

        const data = await Promise.all(promises)

        db.disConnectDb();

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler();