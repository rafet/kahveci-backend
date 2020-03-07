module.exports = function(role, exact = false) {
    return (req, res, next) => {
      if (
        (exact && req.userData.role == role) ||
        (!exact && req.userData.role <= role)
      ) {
        next();
      } else {
        return res.status(401).json({
          message: 'You are not authorized for this operation'
        });
      }
    };
  };
  