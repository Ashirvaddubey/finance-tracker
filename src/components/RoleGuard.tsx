import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'user' | 'read-only')[];
  requireWrite?: boolean;
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requireWrite = false,
  requireAdmin = false,
  fallback = null
}) => {
  const { user, isAdmin, canWrite, canAccessAdmin } = useAuth();

  // If no user is logged in, don't render anything
  if (!user) {
    return fallback;
  }

  // Check specific roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return fallback;
  }

  // Check write permissions
  if (requireWrite && !canWrite()) {
    return fallback;
  }

  // Check admin permissions
  if (requireAdmin && !canAccessAdmin()) {
    return fallback;
  }

  return <>{children}</>;
};

export default RoleGuard;
