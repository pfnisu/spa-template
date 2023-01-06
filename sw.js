import {View, Menu} from './view.js'
import {List} from './list.js'
import {Info} from './info.js'
import {request} from './request.js'

export function StarWars() {
    View(this, false, 'Star Wars Characters')
    this.compose = async () => {
        this.tree.innerHTML =
            `<h1>${this.title}</h1>
            <div></div>`
        Menu(
            [new List(), new Info()],
            this.tree.querySelector('div'),
            null,
            this.title)
    }
}
