import ui from '../ui.js'
import {List} from './list.js'
import {Info} from './info.js'

export function LiveMenu() {
    ui.init(this, 'Live submenu', false)
    this.compose = async () => {
        this.tree.innerHTML =
            `<h1>${this.title}</h1>
            <p>Data (swapi character id) is passed between subviews<br/>
            List is static, fetched only once<br/>
            Info is live with interval = 0, fetched on demand</p>
            <div></div>`
        ui.bind(
            [new List(), new Info()],
            this.tree.querySelector('div'))
    }
}
