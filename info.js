import ui from './ui.js'
import request from './request.js'

export function Info() {
    ui.view(this, 'character', true)
    this.tree.innerHTML =
        `<a target="character">&laquo; Back to list</a><br/>
        <p>Loading...</p>`
    this.interval = 0
    this.compose = async () => {
        if (!this.data) return
        let json = await request.http(
            `https://swapi.dev/api/people/${this.data}`)
        let content = ''
        for (const key in json) content += `<p>${key}: ${json[key]}</p>`
        this.tree.querySelector('p').innerHTML = content
        this.tree.querySelector('a')
            .addEventListener('click', this.navigate)
    }
}
