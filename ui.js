import request from './request.js'

export default {
    // menu()   Construct a menu of views
    // views    Array of unique objects constructed with view()
    // root     Root element
    // nav      Optional navigation element:
    // TODO main menu = no id, submenus = id
    //          If nav has id, its position is saved to cookie.
    //          Without nav, navigate() is injected to each view
    //          for manual switching via target attribute.
    // title    Optional string used as document title
    // TODO add param for hash clearing (keep state vs cleaner url)
    // TODO consolidate titles and ids
    menu: (views, root, nav = null, title = null) => {
        // Switch to view that matches hash
        const setView = () => {
            for (const v of views) v.stop()
            let index = nav?.id
                ? request.path(nav.id) ?? 0
                : views.findIndex((v) => {
                    v.data = request.path(v.title)
                    return v.data !== null
                })
            if (index < 0) index = 0
            if (nav) {
                nav.innerHTML = views.reduce((cat, v) =>
                    `${cat}<a target="${v.title}">${v.title}</a>`, '')
                nav.children[index].className = 'active'
            }
            if (title) document.title = `${views[index].title}${title}`
            views[index].start()
        }
        // Change location hash to match event
        const navigate = (ev) => {
            if (title) window.location.hash = ''
            if (nav) request.path(
                nav.id,
                views.findIndex((v) => v.title === ev.target.target))
            else request.path(ev.target.target, ev.target.id)
        }
        for (const v of views) {
            v.root = root
            if (nav === null) v.navigate = navigate
        }
        // Setup listeners for nav and hash
        nav?.addEventListener('mousedown', navigate, true)
        window.addEventListener('hashchange', setView)
        setView()
    },

    // view()   Construct a view
    // target   Target object, required to have target.compose()
    // id       Unique string used as view id and title in menu
    // live     Optional boolean to construct a live or static view:
    //          Live view uses target.interval (default = 10000, disable = 0)
    view: (target, id, live = false) => {
        target.title = id
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
            const interval = target.interval ?? 10000
            if (live && interval && !target.id)
                // TODO s/id/iid
                target.id = setInterval(() => {
                    if (document.visibilityState === 'visible') load()
                }, interval)
        }
        target.stop = () => {
            clearInterval(target.id)
            target.id = null
            target.visible = null
        }
    }
}
