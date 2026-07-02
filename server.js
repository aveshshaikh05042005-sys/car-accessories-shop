const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
    { id: 1, name: "UltraDrive 4K Dashcam", price: 149.99, category: "electronics", desc: "4K UHD recording, night vision, AI sensor.", icon: "cpu" },
    { id: 2, name: "Leather Seat Covers (Set)", price: 89.99, category: "interior", desc: "Premium breathable leatherette universal fit.", icon: "armchair" },
    { id: 3, name: "All-Weather Rubber Floor Mats", price: 45.50, category: "interior", desc: "Heavy-duty custom trim channels fluid.", icon: "layers" },
    { id: 4, name: "Carbon Fiber Rear Spoiler", price: 120.00, category: "exterior", desc: "Lightweight aerodynamic performance look.", icon: "wind" },
    { id: 5, name: "Magnetic Phone Mount", price: 19.99, category: "electronics", desc: "N52 Neodymium magnets for extreme grip.", icon: "smartphone" },
    { id: 6, name: "LED Underglow Kit", price: 59.99, category: "electronics", desc: "RGB multi-color app-controlled ambient lighting.", icon: "zap" },
    { id: 7, name: "Heavy Duty Car Cover", price: 74.99, category: "exterior", desc: "5-layer waterproof UV sun protection.", icon: "shield" },
    { id: 8, name: "Ergonomic Memory Foam Pillow", price: 29.99, category: "interior", desc: "Contoured neck support for long commutes.", icon: "smile" }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/checkout', (req, res) => {
    const { cartItems } = req.body;
    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    const totalAmount = cartItems.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    console.log(`\n📦 New Order Received!`);
    console.log(`Items:`, cartItems.map(i => `${i.name} (x${i.qty})`));
    console.log(`Total Value: $${totalAmount.toFixed(2)}`);

    res.json({
        success: true,
        message: "Order received successfully!",
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        total: totalAmount
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Car Accessories Server running at http://localhost:${PORT}`);
});