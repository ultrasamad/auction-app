const useAuth = () => {

    const isAuthenticated = () => {
        //Fetch localStorage and parse for token
        //Dummy implementation
        const authToken = localStorage.getItem('auction.token');
        if(authToken) return true;
        return false;
    }

    const logout = () => {
        localStorage.removeItem('auction.token');
    }

    return {
        isAuthenticated,
        logout
    }
}

export default useAuth;