const re = (key) => new RegExp(`\\b${key}=([\\w]+)`)

export default {
    // cookie() Get or set cookie:
    //          Returns value string if cookie is found or set,
    //          otherwise null.
    // key      Cookie name
    // value    Get cookie value if null, else set cookie to value
    cookie: (key, value = null) => {
        let match = ['', value]
        if (value !== null)
            document.cookie = `${key}=${value}; SameSite=Strict`
        else if (key)
            match = document.cookie.match(re(key))
        return match?.length > 1 ? match[1] : null
    },

    // hash()   Get or set parameters in URL hash
    // key      Param name
    // value    Get param value if null,
    //          remove param if empty string,
    //          else set param to value.
    // clear    Optional boolean to remove all previous params from hash
    hash: (key, value = null, clear = false) => {
        let hash = clear ? '' : window.location.hash
        const match = hash.match(re(key)) || ['']
        if (value !== null) {
            hash = hash.replace(match[0], '')
            if (value !== '') hash += `;${key}=${value}`
            window.location.hash = hash.replace(/(?<=^|#|;);|;(?=$)/g, '')
        }
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
    }
}
