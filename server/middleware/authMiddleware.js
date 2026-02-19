// responsible for reading JWT from headers
//verifying the token
// attaching the req.user
const jwt = require("jsonwebtoken");


 const authMiddleware = (req, res, next) => {

    //get the token from authorization header
    // bearer <token>
  const authHeader = req.headers.authorization;
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
    
  }

  const token = authHeader.split(" ")[1];

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //attach decoded user info to the request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
  
};
module.exports =authMiddleware;
