import ui from '../ui.js'
import {List} from './list.js'
import {Info} from './info.js'

export function LiveMenu() {
    ui.view(this, 'Live submenu')
    this.compose = async () => {
        this.tree.innerHTML =
            `<h1>${this.title}</h1>
            <p>Data (id) is passed between subviews<br/>
            List is static, fetched only once<br/>
            Info is live with interval = 0, fetched on demand</p>
            <div></div>`
        ui.menu(
            [new List(), new Info()],
            this.tree.querySelector('div'))
    }
}
