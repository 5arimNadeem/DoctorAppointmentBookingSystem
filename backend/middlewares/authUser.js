import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        // const { userId } = req.body;
        if (!token) {
            return res.json({
                success: false,
                message: "Not authorized login again",
            });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(token_decode)
        // console.log(req.body)

        /* // ❌ Bad: Mixing authentication data with request body
        req.body.userId = "123"
        // req.body should only contain data sent by client
        // Authentication data shouldn't be in body

        // ✅ Good: Separate property for authentication
        req.user = { id: "123", email: "user@example.com" }
        // Clear separation of concerns
        // req.body = client data
        // req.user = authenticated user info */
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
