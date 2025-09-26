# Role-Based Access Control (RBAC) Implementation

## Overview

This document describes the implementation of Role-Based Access Control (RBAC) in the Expense Tracker application. The system supports three user roles with different permission levels.

## User Roles

### 1. Admin (`admin`)
- **Full privileges** - Can access all features
- Can view, create, edit, and delete any user's data
- Can manage user roles and permissions
- Can access admin dashboard
- Can view system-wide statistics

### 2. User (`user`)
- **Standard privileges** - Can perform CRUD on their own data
- Can create, read, update, and delete their own expenses
- Can view their own analytics and statistics
- Cannot access other users' data
- Cannot access admin features

### 3. Read-Only (`read-only`)
- **Limited privileges** - Can only view their own data
- Can view their own expenses and analytics
- Cannot create, edit, or delete any data
- Cannot access admin features
- UI elements are disabled to prevent write operations

## Backend Implementation

### Database Schema

The `User` model includes a `role` field:

```javascript
role: {
  type: String,
  default: 'user',
  enum: ['admin', 'user', 'read-only'],
  required: true
}
```

### JWT Claims

JWT tokens now include role information:

```javascript
const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
  expiresIn: '7d'
});
```

### Middleware

#### Authentication Middleware (`server/middleware/auth.js`)
- Verifies JWT tokens
- Adds user role information to request object

#### RBAC Middleware (`server/middleware/rbac.js`)
- `requireRole(allowedRoles)` - Check if user has specific role(s)
- `requireWriteAccess()` - Check if user can perform write operations
- `requireAdminAccess()` - Check if user is admin
- `requireOwnershipOrAdmin()` - Check if user owns data or is admin

### Route Protection

#### Expense Routes (`/api/expenses`)
- `GET /` - All roles can view their own expenses
- `GET /stats` - All roles can view their own statistics
- `POST /` - Admin and User roles only (write access required)
- `PUT /:id` - Admin and User roles only (write access required)
- `DELETE /:id` - Admin and User roles only (write access required)

#### User Routes (`/api/users`)
- `PUT /profile` - All authenticated users can update their own profile
- `GET /` - Admin only (list all users)
- `GET /:id` - Admin only (get specific user)
- `PUT /:id/role` - Admin only (update user role)
- `DELETE /:id` - Admin only (delete user)
- `GET /stats/overview` - Admin only (system statistics)

## Frontend Implementation

### AuthContext Updates

The `AuthContext` now includes role-based helper functions:

```typescript
interface AuthContextType {
  // ... existing properties
  isAdmin: () => boolean;
  isUser: () => boolean;
  isReadOnly: () => boolean;
  canWrite: () => boolean;
  canAccessAdmin: () => boolean;
}
```

### RoleGuard Component

A reusable component for conditional rendering based on user roles:

```typescript
<RoleGuard requireWrite={true}>
  <EditButton />
</RoleGuard>

<RoleGuard requireAdmin={true}>
  <AdminPanel />
</RoleGuard>
```

### UI Adaptations

#### ExpenseForm Component
- Form fields are disabled for read-only users
- Submit button is hidden for read-only users
- Header shows "Read Only" indicator

#### ExpenseList Component
- Edit and delete buttons are hidden for read-only users
- Header shows "Read Only" indicator

#### Dashboard Component
- Admin users see tab navigation (Expenses/Admin)
- Admin dashboard is only accessible to admin users
- Add expense button is only shown on expenses tab

#### AdminDashboard Component
- Complete user management interface
- Role management (change user roles)
- User statistics and analytics
- User search and filtering

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (default role: 'user')
- `POST /api/auth/login` - Login user (returns JWT with role)
- `GET /api/auth/me` - Get current user info (includes role)

### Expenses (Role-based)
- `GET /api/expenses` - View own expenses (all roles)
- `GET /api/expenses/stats` - View own statistics (all roles)
- `POST /api/expenses` - Create expense (admin, user)
- `PUT /api/expenses/:id` - Update expense (admin, user)
- `DELETE /api/expenses/:id` - Delete expense (admin, user)

### Users (Admin only)
- `GET /api/users` - List all users (admin)
- `GET /api/users/:id` - Get specific user (admin)
- `PUT /api/users/:id/role` - Update user role (admin)
- `DELETE /api/users/:id` - Delete user (admin)
- `GET /api/users/stats/overview` - System statistics (admin)

## Testing the Implementation

### Create Admin User

Run the following command to create an admin user for testing:

```bash
cd server
npm run create-admin
```

This creates an admin user with:
- Email: `admin@example.com`
- Password: `admin123`
- Role: `admin`

### Test Different Roles

1. **Admin User**: Login with admin credentials to access all features
2. **Regular User**: Register a new user (default role: 'user')
3. **Read-Only User**: Use admin panel to change a user's role to 'read-only'

### Role Testing Scenarios

#### Admin User
- ✅ Can view all users in admin dashboard
- ✅ Can change user roles
- ✅ Can delete users
- ✅ Can access all expense features
- ✅ Can view system statistics

#### Regular User
- ✅ Can create, edit, delete their own expenses
- ✅ Can view their own statistics
- ❌ Cannot access admin dashboard
- ❌ Cannot view other users' data

#### Read-Only User
- ✅ Can view their own expenses
- ✅ Can view their own statistics
- ❌ Cannot create, edit, or delete expenses
- ❌ Cannot access admin features
- ❌ Form fields are disabled

## Security Considerations

1. **JWT Token Security**: Role information is embedded in JWT tokens
2. **Server-side Validation**: All permissions are validated on the server
3. **Database Queries**: Users can only access their own data (unless admin)
4. **UI Restrictions**: Frontend prevents unauthorized actions
5. **Role Inheritance**: Admin role includes all user permissions

## Error Handling

The system provides clear error messages for unauthorized access:

- `401 Unauthorized` - No valid token provided
- `403 Forbidden` - Insufficient permissions for the action
- `404 Not Found` - Resource not found or not accessible

## Future Enhancements

1. **Permission Granularity**: More specific permissions beyond roles
2. **Role Hierarchy**: Define role inheritance rules
3. **Audit Logging**: Track role changes and admin actions
4. **Bulk Operations**: Admin bulk user management features
5. **Role Templates**: Predefined role configurations

## Conclusion

The RBAC implementation provides a robust, secure, and user-friendly system for managing different user access levels in the Expense Tracker application. The system is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend components.
