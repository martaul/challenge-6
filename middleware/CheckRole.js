export const CheckRole = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role === "member") {
        throw new Error("Anda tidak memiliki akses");
      }
      if (req.user.role == role) {
        return next();
      }
      next();
    } catch (error) {
      res.status(401).json({
        status: "failed",
        message: error.message,
      });
    }
  };
};

export const onlySuperAdmin = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== "super admin") {
        throw new Error("Anda tidak memiliki akses");
      }
      if (req.user.role == role) {
        return next();
      }
      next();
    } catch (error) {
      res.status(401).json({
        status: "failed",
        message: error.message,
      });
    }
  };
};