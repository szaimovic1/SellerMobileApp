import Movies from '../src/Movies';
import 'isomorphic-fetch';

it("API test 1", async function () {
    const response = await Movies.getAll();
    expect(response.movies[2].title).toEqual('The Matrix');
});

it("API test 2", async function () {
    global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return { id: 1 }
                }
            });
        });

        return p;
    });

    const response = await Movies.getAll();
    expect(response.id).toBe(1);
});
