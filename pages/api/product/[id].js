import Product from '@/models/Product';
import product from '@/pages/product/[slug]';
import db from '@/utils/db';
import { createRouter } from 'next-connect';
const router = createRouter();

router.get(async (req, res) => {
    try {
        db.connectDb();
        const id = req.query.id;
        const style = req.query.style;
        const size = req.query.size;
        // console.log(id, style, size);

        const product = await Product.findById(id).lean();
        let discount = product.subProducts[style].discount;
        let priceBefore = product.subProducts[style].sizes[size].price;
        let price = discount ? (priceBefore - (priceBefore / discount)) : (priceBefore);

        db.disConnectDb();

        return res.json({
            _id: product._id,
            style: Number(style),
            name: product.name,
            description: product.description,
            slug: product.slug,
            sku: product.subProducts[style].sku,
            brand: product.brand,
            shipping: product.brand,
            images: product.subProducts[style].images,
            color: product.subProducts[style].color,
            price, priceBefore,
            quantity: product.subProducts[style].sizes[size].qty,
            size: product.subProducts[style].sizes[size].size
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler();