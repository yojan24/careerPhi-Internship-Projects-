const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(
    fn(req, res, next).catch((error) => {
      const Code = error.statusCode || 500;
      console.log(error);
      res.status(Code).json({
        message: error.message,
      });
    })
  );
};

export default asyncHandler;
