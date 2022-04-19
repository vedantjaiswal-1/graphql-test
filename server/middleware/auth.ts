export {};
const jwt = require("jsonwebtoken");

const authenticate = async (req: any, res: any, next: any) => {
  const token = req?.headers?.authorization?.split(" ")[1] || "";

  try {
    const verified = jwt.verify(token, "121215");
    // const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.verifiedUser = verified?.user;
    next();
  } catch (err) {
    console.log("Verification failed!", err);
    next();
  }
};

module.exports = { authenticate };
