import Product from '@/models/Product';
import User from '@/models/User';
import Cart from '@/models/Cart';
import db from '@/utils/db';
import { createRouter } from 'next-connect';
import auth from '@/middleware/auth';
const router = createRouter();
router.use(auth);

router.post(async (req, res) => {

    // console.log("User Id A ", req.user)
    // return;
    try {
        db.connectDb();
        // console.log("Request Body", req.body)
        const { cart } = req.body;
        // console.log("Cart", cart)
        let products = [];

        let user = await User.findById(req.user);
        // console.log("User", user)
        // console.log("Check One")
        let existingCart = await Cart.findOne({ user: user._id })

        // console.log(existingCart);


        if (existingCart) {
            await existingCart.remove()
        }

        // console.log("Check Two")
        for (let i = 0; i < cart.length; i++) {
            let dbProduct = await Product.findById(cart[i]._id).lean();

            // console.log("dbProduct", dbProduct)

            // console.log("cart[i].styles", cart[i].style)
            let subProduct = dbProduct.
                subProducts[cart[i].style];

            // console.log("subProduct", subProduct)

            // tempProduct is an empty object here
            // console.log("Check Two A")
            let tempProduct = {}
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.color = {
                color: cart[i].color.color,
                image: cart[i].color.image,
            }
            // console.log("Check Two B")
            tempProduct.image = subProduct.images[0].url;
            tempProduct.qty = Number(cart[i].qty);
            // console.log("Check Two C")
            tempProduct.size = cart[i].size;
            let price = Number(
                subProduct.sizes.find((p) => p.size == cart[i].size).price
            );

            // console.log("Check Two D")
            tempProduct.price = subProduct?.discount > 0 ? (price - price / Number(subProduct.discount)).toFixed(2) : price.toFixed(2);

            // console.log("Check Two E")

            products.push(tempProduct);
        }
        // console.log("Check Three")

        let cartTotal = 0;

        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].qty;
        }

        cartTotal = Number(cartTotal)

        // console.log("Check Four")

        // console.log(products);

        await new Cart({
            products,
            cartTotal: cartTotal.toFixed(2),
            user: user._id
        }).save();


        db.disConnectDb();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler();