// auth helper 
export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.dispatchEvent(new Event("storage"));
  
};
