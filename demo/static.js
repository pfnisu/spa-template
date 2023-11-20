import ui from '../ui.js'
import {Submenu} from './submenu.js'

export function Static() {
    ui.init(this, 'Static submenu', false)
    this.compose = async () => {
        this.tree.innerHTML =
            `<h1>${this.title}</h1>
            <p id="submenu"></p>
            <div></div>`
        ui.bind([
            new Submenu('Tab 1', `<p>Static content is loaded once and cached</p>`),
            new Submenu('Tab 2',
                `<p>Position is pushed to URL hash, browser navigation works</p>
                <a href="#menu=1;character=5">Direct links to hrefs work &raquo;</a>`)],
            this.tree.querySelector('div'),
            this.tree.querySelector('p'))
    }
}
