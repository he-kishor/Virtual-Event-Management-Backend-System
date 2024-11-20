
const errorHandler = (res, error) => {
    const status = error.status || 500;
    console.log(error.message)
    const message = error.message || "Server error";
    res.status(status).json({ message });
  };
  
  module.exports = errorHandler;
  