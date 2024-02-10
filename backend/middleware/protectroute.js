import User from "../modal/users.modal.js";

const protectRouter = async (req, res, next) => {
  try {
    console.log(req.session.userId)
    // Check if userId is set in the session
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized - User not logged in' });
    }

    // If userId is set, fetch the user data from the database
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach the user object to the request for future use
    req.user = user;
    console.log(req.user)

    // Call the next middleware in the chain
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default protectRouter;
