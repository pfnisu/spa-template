import {View} from './view.js'

export function News() {
    View(this, false, 'News')
    this.compose = async () => {
        this.tree.innerHTML = `<p>Coming soon...</p>`
    }
}
