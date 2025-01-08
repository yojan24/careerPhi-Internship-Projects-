import jwt from "jsonwebtoken";

const generateToken = async (res, id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });
  } catch (error) {
    console.log("Token generation error", error.message);
    throw new Error("Token generation error");
  }
};
export default generateToken;
