import { User } from "../Model/model.js";

const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      let UserId = req._id;
      let user = await User.findById(UserId);
      let userRole = user.role;
      if (roles.includes(userRole)) {
        next();
      } else {
        res.status(401).json({
          status: false,
          message: `Bin bolaye nahi aa jate hai beta`,
        });
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: `Jao invitation magke aao`,
      });
    }
  };
};

export default isAuthorized;
