import {View} from './view.js'

export function Contact() {
    View(this, 'Contact Info', false)
    this.compose = async () => {
        this.tree.innerHTML = `<p>example@example.com</p>`
    }
}
