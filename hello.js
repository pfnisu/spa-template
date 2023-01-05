import {View, Menu} from './view.js'
import {News} from './news.js'
import {Contact} from './contact.js'

export function Hello() {
    View(this, 'Hello world', false)
    this.compose = async () => {
        this.tree.innerHTML =
            `<h1>${this.title}</h1>
            <p></p>
            <p></p>`
        Menu(
            [new News(), new Contact()],
            ...document.querySelectorAll('p'))
    }
}
