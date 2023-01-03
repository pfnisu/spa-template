import {View} from './view.js'

export function Hello() {
    View(this, 'Hello world', false)
    this.compose = async () => {
        this.tree.innerHTML = `<h1>${this.title}</h1>`
    }
}
