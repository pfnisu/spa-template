import request from './request.js'

export default {
    // bind()   Bind an array of views to a root element
    // views    Array of unique objects constructed with init()
    // root     Root element
    // nav      Optional navigation element for generating a menu:
    //          Required to have id (i.e. hash param) to allow multiple menus.
    //          Without nav, navigation can be used by giving the element
    //          a target attribute (key=value).
    // title    Optional string used as document title:
    //          Passing title will treat menu as main level.
    //          Used only if also passing nav.
    bind: (views, root, nav = null, title = null) => {
        // Switch to view that matches hash
        const setView = () => {
            for (const v of views) if (v.visible) v.stop()
            if (nav) {
                nav.innerHTML = views.reduce((cat, v) =>
                    `${cat}<a target="${v.title}">${v.title}</a>`, '')
                const index = request.hash(nav.id) ?? 0
                nav.children[index].className = 'active'
                if (title) document.title = `${views[index].title}${title}`
                views[index].start()
            } else
                (views.find((v) => request.hash(v.title)) || views[0]).start()
        }
        // Change location hash to match event target
        if (nav)
            nav.addEventListener('mousedown', (ev) => {
                request.hash(
                    nav.id,
                    views.findIndex((v) => v.title === ev.target.target),
                    title)
            }, true)
        else
            root.addEventListener('click', (ev) => {
                if (ev.target.target)
                    request.hash(...ev.target.target.split('='), '')
            }, true)
        for (const v of views) v.root = root
        // Change view when hash changes
        window.addEventListener('hashchange', setView)
        setView()
    },

    // init()   Construct a composable view
    // target   Target object, required to have target.compose()
    // title    Unique string used as view id and title in menu
    // live     Optional boolean to construct a live or static view:
    //          Live view uses target.interval, default = 0 (i.e. on demand).
    //          Static view is composed only once.
    init: (target, title, live = true) => {
        target.title = title
        target.listeners = []
        target.tree = document.createElement('div')
        // Replace view with updated tree
        const load = async () => {
            if (target.visible) target.root.replaceChildren(target.tree)
            if (!target.loaded) await target.compose()
            if (!live) target.loaded = true
        }
        // Reload logic is only spawned if view is live and visible
        target.start = () => {
            target.visible = true
            load()
            const interval = target.interval ?? 0
            if (live && interval && !target.id)
                target.id = setInterval(() => {
                    if (document.visibilityState === 'visible') load()
                }, interval)
        }
        target.stop = () => {
            clearInterval(target.id)
            target.id = null
            target.visible = null
        }
        // Subscribe to notifications from target object
        target.listen = (fn) => {
            target.listeners.push(fn)
        }
        target.forget = (fn) => {
            target.listeners = target.listeners.filter((el) => el !== fn)
        }
        target.notify = (data = null) => {
            for (const fn of target.listeners) fn(data)
        }
    }
}
