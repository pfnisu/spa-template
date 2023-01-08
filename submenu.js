import {View} from './view.js'

export function Submenu(title, html) {
    View(this, title)
    this.compose = async () => {
        this.tree.innerHTML = html
    }
}
