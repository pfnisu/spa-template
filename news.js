import {View} from './view.js'

export function News() {
    View(this, 'News')
    this.compose = async () => {
        this.tree.innerHTML = `<p>Position is saved to cookie</p>`
    }
}
