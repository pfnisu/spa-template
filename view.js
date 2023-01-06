import {request} from './request.js'

// View()   Construct a view
// target   Target object, required to have target.compose()
// live     Optional boolean to construct a live or static view:
//          live view has default interval of 10s,
//          can be set in target.interval (0 = disable)
// title    Optional string used as menu and document title
export function View(target, live = false, title = '') {
    target.title = title
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
        //const interval = request.cookie('interval') ?? 10000
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
}

// Menu()   Construct a menu of views
// views    Array of unique objects constructed with View()
// root     Root element
// nav      Optional navigation element:
//          without nav, setView() is injected to each view
//          for manual view switching via target attribute
// title    Optional string used as menu and document title
export function Menu(views, root, nav = null, title = '') {
    // Switch to view that matches event
    const setView = (ev) => {
        for (const v of views) v.stop()
        const index = ev
            ? views.findIndex((v) => v.constructor.name === ev.target.target)
            : request.cookie(nav?.id) ?? 0
        if (nav !== null) {
            nav.innerHTML = views.reduce((cat, v) =>
                `${cat}<a target="${v.constructor.name}">${v.title}</a>`, '')
            nav.children[index].className = 'active'
            if (nav.id) request.cookie(nav.id, index)
        }
        document.title = `${title}${views[index].title}`
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
