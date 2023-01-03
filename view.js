// Construct a view
export function View(target, title = '', live = true) {
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
        if (live && !target.id)
            target.id = setInterval(() => {
                if (document.visibilityState === 'visible') load()
            }, target.interval)
    }
    target.stop = () => {
        clearInterval(target.id)
        target.id = null
        target.visible = null
    }
}

// Initialize views
export function Init(views, root, nav, initial = 0) {
    for (const v of views) v.root = root
    // Set view to activated tab
    const setView = (ev) => {
        for (const v of views) v.stop()
        // Concatenate navigation from view titles
        nav.innerHTML = views.reduce((cat, v) => `${cat}<a>${v.title}</a>`, '')
        const index = ev
            ? views.findIndex((v) => v.title === ev.target.textContent)
            : initial
        nav.children[index].className = 'active'
        document.title = `${views[index].title}`
        views[index].start()
    }
    // Setup a listener for nav
    nav.addEventListener('mousedown', setView, true)
    setView()
}
