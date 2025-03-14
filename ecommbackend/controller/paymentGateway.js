const dotenv = require('dotenv');
dotenv.config();
const razorpay = require('razorpay');
const orders = require('../model/orderSchema');
const crypto = require('crypto');

const creatingOrder = async (req, res) => {
    const { amount, currency, receipt, userId, products } = req.body;
    console.log("Request Body:", { amount, currency, receipt, userId, products });

    try {
        console.log("Razorpay Key ID:", process.env.RZID);
        console.log("Razorpay Key Secret:", process.env.RZSECRET);

        const rzpay = new razorpay({
            key_id: process.env.RZID,
            key_secret: process.env.RZSECRET,
        });

        const options = {
            amount: amount * 100,
            currency,
            receipt,
        };
        console.log("Razorpay Order Options:", options);

        const order = await rzpay.orders.create(options);
        console.log("Razorpay Order Response:", order);

        const paymentDetails = new orders({
            orderId: order.id,
            userId: JSON.parse(userId),
            products,
            status: "Pending",
            amount: amount,
        });

        await paymentDetails.save();
        res.json(order);
    } catch (err) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("Verification Request Body:", { razorpay_order_id, razorpay_payment_id, razorpay_signature });

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const exceptedsignature = crypto
            .createHmac('sha256', process.env.RZSECRET)
            .update(body.toString())
            .digest('hex');

        if (exceptedsignature === razorpay_signature) {
            await orders.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    paymentId: razorpay_payment_id,
                    status: "success",
                    orderstatus: "Order Confirmed",
                }
            );
            res.json({ status: "success" });
        } else {
            await orders.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    status: "Failed",
                    orderstatus: "Order failed",
                }
            );
            res.status(400).json({ status: "failure" });
        }
    } catch (err) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    creatingOrder,
    verifyPayment,
};
