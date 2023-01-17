import request from './request.js'

export default {
    // menu()   Construct a menu of views
    // views    Array of unique objects constructed with view()
    // root     Root element
    // nav      Optional navigation element:
    //          Required to have id (= hash param) to allow multiple menus.
    //          Without nav, navigate() is injected to each view
    //          for manual switching via target attribute.
    // title    Optional string used as document title:
    //          Setting title will treat menu as main level.
    // TODO main menu = no id, submenus = id
    // TODO add param for hash clearing (keep state vs cleaner url)
    // TODO consolidate titles and ids
    menu: (views, root, nav = null, title = null) => {
        // Switch to view that matches hash
        const setView = () => {
            for (const v of views) v.stop()
            // TODO use view title directly
            let index = nav
                ? request.hash(nav.id) ?? 0
                : views.findIndex((v) => {
                    v.data = request.hash(v.title)
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
            if (nav)
                request.hash(
                    nav.id,
                    views.findIndex((v) => v.title === ev.target.target))
            else request.hash(...ev.target.target.split('='), '')
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
    // title    Unique string used as view id and title in menu
    // live     Optional boolean to construct a live or static view:
    //          Live view uses target.interval (default = 10000, disable = 0)
    view: (target, title, live = false) => {
        target.title = title
        target.tree = document.createElement('div')
        // Replace view with updated tree
        const load = async () => {
            if (target.visible) target.root.replaceChildren(target.tree)
            if (!target.loaded) await target.compose()
            // TODO possible async bug (remove await? or set loaded before)
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
