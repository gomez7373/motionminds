// Placeholder for utility functions related to API calls
const api = {
    get: (url) => {
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('API GET Error:', error));
    },
    post: (url, data) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => console.error('API POST Error:', error));
    },
};
