import ui from './ui.js'
import {Submenu} from './submenu.js'

export function Static() {
    ui.view(this, 'Static submenu')
    this.compose = async () => {
        this.tree.innerHTML =
            `<h1>${this.title}</h1>
            <p id="submenu"></p>
            <div></div>`
        ui.menu(
            [new Submenu('Tab 1', `<p>Static content is loaded once and cached</p>`),
                new Submenu('Tab 2', `<p>Position is saved to cookie</p>`)],
            this.tree.querySelector('div'),
            this.tree.querySelector('p'))
    }
}
