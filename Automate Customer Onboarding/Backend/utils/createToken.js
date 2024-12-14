import jwt from "jsonwebtoken";

const generateToken = async (res, id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Token generation failed");
  }
};

export default generateToken;
