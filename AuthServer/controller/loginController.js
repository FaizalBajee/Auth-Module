const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const db = req.app.locals.db; // access the MongoDB connection
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // 2️⃣ Check if user exists
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Compare plain text passwords (⚠️ for dev/demo only)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "SECRET_KEY", // replace with process.env.JWT_SECRET in real projects
      { expiresIn: "1h" }
    );

    // 5️⃣ Send success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
      },
    });
    console.log({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
      },
    });
  } catch (err) {
    console.error("❌ Error in login:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { login };
