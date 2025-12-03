# Authentication System - Complete Guide

## Overview

Apex Insights now includes a complete authentication system with user registration, login, and role-based access control. The system uses Supabase Auth with username/password authentication.

---

## Key Features

✅ **User Registration** - Create new accounts with username and password  
✅ **User Login** - Sign in with existing credentials  
✅ **Protected Routes** - All pages require authentication  
✅ **Role-Based Access** - Admin and User roles  
✅ **Auto-Admin Assignment** - First user becomes admin automatically  
✅ **Session Management** - Persistent login sessions  
✅ **Logout Functionality** - Secure sign out  
✅ **User Profile Display** - Show username and role in header

---

## Getting Started

### First Time Setup

1. **Access the Application**
   - Open the application in your browser
   - You'll be redirected to the login page

2. **Create First Account (Admin)**
   - Click "Create account" link
   - Enter a username (3-20 characters, letters, numbers, underscores only)
   - Enter a password (minimum 6 characters)
   - Confirm password
   - Click "Create Account"
   - **You are now the admin!** 🎉

3. **Subsequent Users**
   - Other users can sign up the same way
   - They will have "User" role by default
   - Admin can manage user roles (future feature)

---

## Authentication Pages

### Login Page (`/login`)

**Purpose**: Sign in to existing account

**Fields**:
- **Username**: Your account username
- **Password**: Your account password

**Features**:
- Error messages for invalid credentials
- Loading state during sign in
- Link to signup page
- Responsive design

**URL**: `http://localhost:5173/login`

### Signup Page (`/signup`)

**Purpose**: Create new account

**Fields**:
- **Username**: Choose a unique username
  - 3-20 characters
  - Letters, numbers, and underscores only
  - Example: `john_doe`, `admin123`, `user_1`
- **Password**: Create a secure password
  - Minimum 6 characters
  - No specific requirements
- **Confirm Password**: Re-enter password

**Features**:
- Real-time validation
- Username format checking
- Password matching verification
- First user becomes admin notification
- Link to login page

**URL**: `http://localhost:5173/signup`

---

## User Roles

### Admin Role

**Assigned To**: First user to sign up

**Capabilities**:
- Full access to all features
- View all customer data
- Manage segments
- Create offers
- Import data
- Generate segments
- Access settings

**Visual Indicators**:
- Shield icon in header
- "Admin" badge next to username
- "Administrator" label in mobile menu

### User Role

**Assigned To**: All subsequent users

**Capabilities**:
- Full access to all features (same as admin currently)
- View customer data
- Manage segments
- Create offers
- Import data
- Generate segments
- Access settings

**Visual Indicators**:
- User icon in header
- No special badge

**Note**: Currently, both roles have the same permissions. Role-based restrictions can be added in the future.

---

## Header Authentication Display

### Desktop View

**When Logged In**:
- User profile badge showing:
  - Shield icon (admin) or User icon (regular user)
  - Username
  - "Admin" badge (if admin)
- "Sign Out" button

**When Logged Out**:
- "Sign In" button

### Mobile View

**When Logged In**:
- User profile card at top of menu showing:
  - Icon (shield or user)
  - Username
  - "Administrator" label (if admin)
- Navigation links
- "Sign Out" button at bottom

**When Logged Out**:
- Navigation links
- "Sign In" button at bottom

---

## Route Protection

### Protected Routes (Require Login)

All main application pages require authentication:

- `/` - Dashboard
- `/segments` - Segments
- `/customers` - Customers
- `/analytics` - Analytics
- `/recommendations` - Recommendations
- `/offers` - Offers
- `/pricing` - Dynamic Pricing
- `/import` - Data Import
- `/generate-segments` - Generate Segments
- `/settings` - Settings

**Behavior**: If not logged in, automatically redirected to `/login`

### Public Routes (No Login Required)

- `/login` - Login page
- `/signup` - Signup page

**Behavior**: Accessible without authentication

---

## Authentication Flow

### Registration Flow

```
1. User visits /signup
   ↓
2. Enters username and password
   ↓
3. System validates:
   - Username format (letters, numbers, underscores)
   - Username length (3-20 characters)
   - Password length (minimum 6 characters)
   - Passwords match
   ↓
4. Creates account in Supabase Auth
   ↓
5. Trigger automatically creates profile:
   - Extracts username from email
   - Assigns role (admin if first user, user otherwise)
   - Stores in profiles table
   ↓
6. User is logged in automatically
   ↓
7. Redirected to dashboard (/)
```

### Login Flow

```
1. User visits /login
   ↓
2. Enters username and password
   ↓
3. System converts username to email format:
   - username → username@miaoda.com
   ↓
4. Authenticates with Supabase
   ↓
5. Fetches user profile from profiles table
   ↓
6. Sets user session
   ↓
7. Redirected to dashboard (/)
```

### Logout Flow

```
1. User clicks "Sign Out"
   ↓
2. System signs out from Supabase
   ↓
3. Clears user session
   ↓
4. Redirected to /login
```

---

## Technical Implementation

### Database Structure

**Table**: `profiles`

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key, references auth.users(id) |
| `username` | text | Unique username |
| `role` | user_role | Enum: 'user' or 'admin' |
| `created_at` | timestamptz | Account creation timestamp |

**Enum**: `user_role`
- Values: `'user'`, `'admin'`

### Authentication Method

**Username + Password**:
- Simulates email/password with `@miaoda.com` domain
- Email verification is disabled
- Username format: letters, numbers, underscores only
- Example: `john_doe` → `john_doe@miaoda.com`

### Automatic Profile Creation

**Trigger**: `on_auth_user_created`
- Fires when new user is created
- Automatically creates profile record
- Extracts username from email
- Assigns admin role to first user
- Assigns user role to subsequent users

### Row Level Security (RLS)

**Policies**:

1. **Admins have full access**
   - Admins can view, edit, delete all profiles
   - Uses `is_admin()` helper function

2. **Users can view own profile**
   - Users can read their own profile data
   - Checks `auth.uid() = id`

3. **Users can update own profile**
   - Users can edit their own profile
   - Cannot change their own role
   - Checks `auth.uid() = id` and role unchanged

### Authentication Context

**Provider**: `AuthProvider`
- Wraps entire application
- Manages authentication state
- Provides auth functions

**Hook**: `useAuth()`
- Access current user
- Access user profile
- Check if admin
- Sign in/up/out functions

**State**:
- `user`: Current Supabase user object
- `profile`: User profile from profiles table
- `loading`: Authentication loading state
- `isAdmin`: Boolean indicating admin status

**Functions**:
- `signIn(username, password)`: Sign in user
- `signUp(username, password)`: Create new account
- `signOut()`: Sign out current user

---

## Username Rules

### Valid Usernames

✅ **Allowed Characters**:
- Lowercase letters: `a-z`
- Uppercase letters: `A-Z`
- Numbers: `0-9`
- Underscore: `_`

✅ **Length**:
- Minimum: 3 characters
- Maximum: 20 characters

✅ **Examples**:
- `john_doe`
- `admin123`
- `user_1`
- `JohnDoe`
- `test_user_2024`

### Invalid Usernames

❌ **Not Allowed**:
- Spaces: `john doe`
- Special characters: `john@doe`, `john.doe`, `john-doe`
- Too short: `ab`
- Too long: `this_is_a_very_long_username_that_exceeds_limit`
- Empty: ``

---

## Password Rules

### Requirements

✅ **Minimum Length**: 6 characters  
✅ **No Maximum**: Any length above 6  
✅ **No Complexity**: No special character requirements

### Recommendations

For better security, use passwords that:
- Are at least 8 characters long
- Mix uppercase and lowercase letters
- Include numbers
- Include special characters
- Are unique to this application

---

## Error Messages

### Login Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Please enter both username and password" | Empty fields | Fill in both fields |
| "Invalid login credentials" | Wrong username or password | Check credentials |
| "Failed to login" | Network or server error | Try again later |

### Signup Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Username must be at least 3 characters" | Username too short | Use longer username |
| "Username must be less than 20 characters" | Username too long | Use shorter username |
| "Username can only contain letters, numbers, and underscores" | Invalid characters | Remove special characters |
| "Password must be at least 6 characters" | Password too short | Use longer password |
| "Passwords do not match" | Confirmation mismatch | Re-enter matching passwords |
| "User already registered" | Username taken | Choose different username |

---

## Session Management

### Session Persistence

- Sessions are stored in browser
- Remain active across page refreshes
- Persist until explicit logout
- Automatically restored on app load

### Session Expiration

- Sessions expire after period of inactivity
- User redirected to login when expired
- Can sign in again to restore access

### Multiple Devices

- Can log in from multiple devices
- Each device has independent session
- Logout on one device doesn't affect others

---

## Security Features

### Password Security

- Passwords are hashed by Supabase
- Never stored in plain text
- Secure transmission over HTTPS

### Session Security

- JWT tokens for authentication
- Secure token storage
- Automatic token refresh

### Database Security

- Row Level Security (RLS) enabled
- Users can only access their own data
- Admins have elevated permissions
- SQL injection protection

### Input Validation

- Username format validation
- Password length validation
- XSS protection
- CSRF protection

---

## Admin Features

### Current Admin Capabilities

As the first user (admin), you have:
- Full access to all features
- Same interface as regular users
- Visual indicators of admin status

### Future Admin Features

Planned admin-only features:
- User management page
- Change user roles
- View all user accounts
- Deactivate users
- System settings
- Analytics dashboard
- Audit logs

---

## Troubleshooting

### Can't Sign In

**Problem**: Login fails with correct credentials

**Solutions**:
1. Check username spelling (case-sensitive)
2. Verify password is correct
3. Clear browser cache and cookies
4. Try different browser
5. Check internet connection

### Can't Sign Up

**Problem**: Signup fails

**Solutions**:
1. Check username format (letters, numbers, underscores only)
2. Ensure username is 3-20 characters
3. Verify password is at least 6 characters
4. Make sure passwords match
5. Try different username (might be taken)

### Redirected to Login

**Problem**: Automatically redirected to login page

**Cause**: Session expired or not logged in

**Solution**: Sign in again with your credentials

### Profile Not Loading

**Problem**: Username not showing in header

**Solutions**:
1. Refresh the page
2. Sign out and sign in again
3. Check browser console for errors

---

## Best Practices

### For Users

1. **Choose Strong Passwords**
   - Use at least 8 characters
   - Mix letters, numbers, symbols
   - Don't reuse passwords

2. **Keep Credentials Secure**
   - Don't share your password
   - Don't write down passwords
   - Use password manager

3. **Sign Out When Done**
   - Especially on shared computers
   - Prevents unauthorized access

4. **Remember Your Username**
   - Write it down securely
   - Use memorable username

### For Admins

1. **Secure Admin Account**
   - Use very strong password
   - Never share admin credentials
   - Change password regularly

2. **Monitor User Activity**
   - Check for suspicious behavior
   - Review user accounts periodically

3. **Backup Important Data**
   - Export customer data regularly
   - Save segment configurations

---

## API Integration

### Using Authentication in Code

**Check if User is Logged In**:
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, profile, isAdmin } = useAuth();
  
  if (!user) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {profile?.username}!</div>;
}
```

**Protect Component**:
```typescript
import ProtectedRoute from '@/components/auth/ProtectedRoute';

<ProtectedRoute>
  <MyComponent />
</ProtectedRoute>
```

**Sign Out Programmatically**:
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    // User is now logged out
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

---

## Database Queries

### Get Current User Profile

```typescript
import { supabase } from '@/db/supabase';

const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .maybeSingle();
```

### Check if User is Admin

```typescript
import { supabase } from '@/db/supabase';

const { data } = await supabase
  .rpc('is_admin', { uid: user.id });

const isAdmin = data === true;
```

---

## Migration Details

### Database Migration

**File**: `supabase/migrations/*_create_profiles_table.sql`

**Creates**:
1. `user_role` enum type
2. `profiles` table
3. RLS policies
4. `is_admin()` helper function
5. `handle_new_user()` trigger function
6. Triggers for auto-profile creation
7. `public_profiles` view

### Environment Variables

**File**: `.env`

**Variables**:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

---

## Summary

### What You Get

✅ Complete authentication system  
✅ User registration and login  
✅ Protected routes  
✅ Role-based access (admin/user)  
✅ Automatic admin assignment  
✅ Session management  
✅ Secure password handling  
✅ User profile display  
✅ Logout functionality

### Quick Start

1. **First User**: Sign up → Become admin automatically
2. **Other Users**: Sign up → Get user role
3. **Login**: Use username and password
4. **Access App**: All features available after login
5. **Logout**: Click "Sign Out" in header

### Important Notes

- First user to sign up becomes admin
- Username format: letters, numbers, underscores only
- Password minimum: 6 characters
- All pages require authentication
- Sessions persist across page refreshes
- Logout from header menu

---

**Implementation Date**: December 3, 2025  
**Status**: ✅ Complete and Production Ready  
**Authentication Method**: Username + Password  
**Database**: Supabase Auth + Profiles Table  
**Version**: 1.0.0
