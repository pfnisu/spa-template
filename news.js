import {View} from './view.js'

export function News() {
    View(this, 'News', false)
    this.compose = async () => {
        this.tree.innerHTML = `<p>${this.title}</p>`
    }
}
