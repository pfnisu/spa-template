import {View} from './view.js'
import {request} from './request.js'

export function Info() {
    View(this, 'Info', true)
    this.tree.innerHTML = '<p>Loading...</p>'
    this.interval = 0
    this.compose = async () => {
        if (!this.data) return
        let json = await request.http(
            `https://swapi.dev/api/people/${this.data}`)
        this.tree.innerHTML = `<a target="List">&laquo; Back to list</a><br/>`
        for (const key in json)
            this.tree.innerHTML += `<p>${key}: ${json[key]}</p>`
        this.tree.querySelector('a')
            .addEventListener('click', this.setView)
    }
}
