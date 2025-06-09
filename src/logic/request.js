const requestApi = async (url, options, params) => {

    const baseUrl = "https://dummyjson.com";

    const response = await fetch(`${baseUrl}${url}?${new URLSearchParams(params).toString()}`, { ...options, method: options.method || "GET" });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export function get(url, options = {}, params = {}) {
    return requestApi(url, { ...options, method: "GET" }, params);
}

export function post(url, options = {}, params = {}) {
    return requestApi(url, { ...options, method: "POST" }, params);
}

export function put(url, options = {}, params = {}) {
    return requestApi(url, { ...options, method: "PUT" }, params);
}

export function del(url, options = {}, params = {}) {
    return requestApi(url, { ...options, method: "DELETE" }, params);
}