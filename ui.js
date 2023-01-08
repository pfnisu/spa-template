import request from './request.js'

export default {
    // view()   Construct a view
    // target   Target object, required to have target.compose()
    // id       Unique string used as menu id and document title
    // live     Optional boolean to construct a live or static view:
    //          live uses target.interval (default = 10000, disable = 0)
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
                target.id = setInterval(() => {
                    if (document.visibilityState === 'visible') load()
                }, interval)
        }
        target.stop = () => {
            clearInterval(target.id)
            target.id = null
            target.visible = null
        }
    },

    // menu()   Construct a menu of views
    // views    Array of unique objects constructed with View()
    // root     Root element
    // nav      Optional navigation element:
    //          if nav has id, its position is saved to cookie
    //          without nav, setView() is injected to each view
    //          for manual view switching via target attribute
    // title    Optional string used as document title
    menu: (views, root, nav = null, title = null) => {
        // Switch to view that matches event
        const setView = (ev) => {
            for (const v of views) v.stop()
            const index = ev
                ? views.findIndex((v) => v.title === ev.target.target)
                : request.cookie(nav?.id) ?? 0
            if (nav) {
                nav.innerHTML = views.reduce((cat, v) =>
                    `${cat}<a target="${v.title}">${v.title}</a>`, '')
                nav.children[index].className = 'active'
                if (nav.id) request.cookie(nav.id, index)
            }
            if (title) document.title = `${views[index].title}${title}`
            if (ev) views[index].data = ev.target.id
            views[index].start()
        }
        for (const v of views) {
            v.root = root
            if (nav === null) v.setView = setView
        }
        // Setup a listener for nav
        nav?.addEventListener('mousedown', setView, true)
        setView()
    }
}
