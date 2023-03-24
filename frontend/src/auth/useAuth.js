const {useContext} = require('react');
const {AuthContext} = require('../contexts/AuthContext');

function useAuth() {
    // return {isLogged: false}
    return useContext(AuthContext);
}

module.exports = useAuth;