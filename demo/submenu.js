import ui from '../ui.js'

export function Submenu(title, html) {
    ui.init(this, title, false)
    this.compose = async () => {
        this.tree.innerHTML = html
    }
}
