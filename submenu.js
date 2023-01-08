import ui from './ui.js'

export function Submenu(title, html) {
    ui.view(this, title)
    this.compose = async () => {
        this.tree.innerHTML = html
    }
}
