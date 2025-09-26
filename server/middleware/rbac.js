// Role-Based Access Control Middleware

/**
 * Middleware to check if user has required role(s)
 * @param {string|string[]} allowedRoles - Single role or array of roles
 * @returns {Function} Express middleware function
 */
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Ensure user is authenticated (should be called after authenticate middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      const userRole = req.user.role;
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Check if user role is in allowed roles
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${userRole}`
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error checking user permissions'
      });
    }
  };
};

/**
 * Middleware to check if user can perform CRUD operations
 * Admin and user roles can perform CRUD, read-only cannot
 */
export const requireWriteAccess = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const userRole = req.user.role;
    const writeRoles = ['admin', 'user'];

    if (!writeRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Write operations require admin or user role. Your role: ${userRole}`
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking write permissions'
    });
  }
};

/**
 * Middleware to check if user can access other users' data
 * Only admin can access other users' data
 */
export const requireAdminAccess = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking admin permissions'
    });
  }
};

/**
 * Middleware to check if user can access their own data or admin can access any data
 */
export const requireOwnershipOrAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const userId = req.params.userId || req.params.id;
    const currentUserId = req.user._id.toString();

    // Admin can access any data
    if (req.user.role === 'admin') {
      return next();
    }

    // User can only access their own data
    if (userId && userId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own data'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking data ownership'
    });
  }
};
