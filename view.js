// View constructor
export function View(target, root, title = '', live = true) {
    target.title = title
    target.tree = document.createElement('div')
    // Replace view with updated tree
    const load = async () => {
        if (target.visible) root.replaceChildren(target.tree)
        if (!target.loaded) await target.compose()
        if (!live) target.loaded = true
    }
    // Reload logic is only spawned if view is live and visible
    target.start = (interval) => {
        target.visible = true
        load()
        if (live && !target.id)
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
