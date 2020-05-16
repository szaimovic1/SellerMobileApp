class Movies {
    static getAll() {
        return fetch('https://reactnative.dev/movies.json').then(res => {
            return res.json();
        });
    }
}

export default Movies;