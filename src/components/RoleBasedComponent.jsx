// RoleBasedComponent.js
import React from 'react';
import { useUser } from '../context/UserContext';

function RoleBasedComponent({ allowedRoles, children }) {
  const { user } = useUser();

  const hasPermission = user!=null && user.roles!=null &&  allowedRoles.some(role => user.roles.includes(role));

  return hasPermission ? <>{children}</> : null;
}

export default RoleBasedComponent;
