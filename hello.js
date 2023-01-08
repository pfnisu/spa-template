import {View, Menu} from './view.js'
import {News} from './news.js'
import {Contact} from './contact.js'

export function Hello() {
    View(this, 'Static submenu')
    this.compose = async () => {
        this.tree.innerHTML =
            `<h1>${this.title}</h1>
            <p id="submenu"></p>
            <div></div>`
        Menu(
            [new News(), new Contact()],
            this.tree.querySelector('div'),
            this.tree.querySelector('p'))
    }
}
