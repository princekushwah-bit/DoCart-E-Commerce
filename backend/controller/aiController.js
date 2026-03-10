import Groq from "groq-sdk";
import productModel from "../model/productModel.js";
import orderModel from "../model/orderModel.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        // 1. Enhanced Inventory Context (With Categories)
        const products = await productModel.find({});
        const inventory = products.length > 0 
            ? products.map(p => `- ${p.name}: ₹${p.price} [Category: ${p.category}]`).join("\n")
            : "No products available in the store right now.";

        // 2. Order Tracing Logic
        let orderDetails = "No order traced yet.";
        if (message.toLowerCase().includes("order") || message.toLowerCase().includes("status") || message.toLowerCase().includes("track")) {
            const allOrders = await orderModel.find({});
            orderDetails = allOrders.length > 0 
                ? allOrders.map(o => `User: ${o.address.firstName}, Status: ${o.status}, Amount: ₹${o.amount}`).join(" | ")
                : "No orders found.";
        }

        // 3. Pro System Prompt with 3 New Sections
        const systemPrompt = `
        You are "DoCart AI", the advanced virtual assistant for DoCart e-commerce.

        ### IDENTITY & STORY:
        - Founder: Prince Kushwah (4th-year B.Tech CSE student, MANIT Bhopal, Scholar No: 2211201362).
        - Website: DoCart is a premium MERN-stack project built for a seamless shopping experience.

        ### BEST SELLERS & STOCK ALERTS:
        - Inventory Data: [ ${inventory} ]
        - If a user asks for recommendations, prioritize products marked as (BEST SELLER 🔥).
        - If a product has a stock warning (⚠️), create urgency by telling the user it's selling out fast!

        ### 1. SMART FILTER & SEARCH (CATEGORY BASED):
        - Inventory Data: [ ${inventory} ]
        - Use this data to filter products by category or price if asked.
        - Example: If user asks for "Shoes", only list products where Category is Shoes.

        ### 2. COUPON & DISCOUNT GUIDE:
        - Active Coupons:
          1. "MANIT10" - 10% Off on first order.
          2. "PRINCE20" - 20% Off for MANIT students.
        - If asked about discounts, share these codes and encourage them to use them at checkout.

        ### 3. RETURN & REFUND POLICY:
        - Policy: 7-day easy return and refund policy.
        - Instruction: If users ask about returns, tell them they can initiate a return from the 'Orders' section within 7 days of delivery. No questions asked!

        ### OPERATIONAL RULES:
        - LANGUAGE: English for English queries. Hinglish for Hindi queries.
        - TRACING: Recent Orders: [ ${orderDetails} ]. Trace by First Name if requested.
        - ANTI-HALLUCINATION: Do NOT mention products (like pens/notebooks) that are NOT in the inventory list.

        ### GUIDELINES:
        - Keep responses under 3-4 sentences.
        - Always be professional yet friendly.
        - Closing: Always end with "Happy Shopping!" or "DoCart pe aapka swagat hai!"
        `;

        // 4. Groq API Call
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            max_tokens: 400
        });

        const reply = chatCompletion.choices[0]?.message?.content || "Sorry, I am facing a technical glitch. Please try again.";
        res.json({ success: true, reply });

    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ success: false, message: "AI is currently offline!" });
    }
};

export { chatWithAI };