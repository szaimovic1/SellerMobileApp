class Users {
    static getAllUsers() {
        return fetch('https://reactnative.dev/movies.json').then(res => {
            return res.json();
        });
    }
}

export default Users;