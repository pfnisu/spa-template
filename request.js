// Utility methods for data
export let request = {
    // cookie() Get or set cookie:
    //          returns value string if cookie is found or set,
    //          otherwise null
    // key      Cookie name
    // value    Get cookie value if null, else set cookie to value
    cookie: (key, value = null) => {
        let match = ['', value]
        if (value !== null)
            document.cookie = `${key}=${value}; SameSite=Strict`
        else if (key)
            match = document.cookie.match(new RegExp(`\\b${key}=([\\d]+)`))
        return match?.length > 1 ? match[1] : null
    },
    // http()   Fetch as json, null on error
    // resource URI to fetch from
    // method   Optional method type (default = GET)
    http: async (resource, method = 'GET') => {
        try {
            let resp = await fetch(resource, {
                method: method,
                headers: {
                    'Content-type': 'application/json',
                },
            })
            if (resp.ok) return await resp.json()
        } catch(e) {
            return null
        }
    },
}
