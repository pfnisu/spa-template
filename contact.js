import {View} from './view.js'

export function Contact() {
    View(this, false, 'Contact')
    this.compose = async () => {
        this.tree.innerHTML = `<p>example@example.com</p>`
    }
}
