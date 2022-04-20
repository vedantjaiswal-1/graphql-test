import jwt from "jsonwebtoken";

const createJwtToken = (user: any) => {
  return jwt.sign({ user }, "121215", {
    expiresIn: "30 days"
  });
};

module.exports = { createJwtToken };
