import decode from "jwt-decode";

const TOKEN_KEY = "blog-web-mern";
const USER_ID = "user-id-blog";

const AuthService = {
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },

  isTokenExpired(token: string) {
    try {
      const decoded: any = decode(token) || {};
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  setUserId(userId: string) {
    localStorage.setItem(USER_ID, userId);
  },

  getUserId(){
    return localStorage.getItem(USER_ID);
  },

  getUsuario() {
    const token =this.getToken();

    if(token === null) return

    return decode(token);
  }
};

export default AuthService;