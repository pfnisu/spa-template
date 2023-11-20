import ui from '../ui.js'
import request from '../request.js'

export function Info() {
    ui.init(this, 'character')
    this.tree.innerHTML =
        `<a target="${this.title}">&laquo; Character list</a><br/>
        <p>Loading...</p>
        <a href="#menu=1">&laquo; Character list (href)</a>`
    this.compose = async () => {
        let json = await request.http(
            `https://swapi.dev/api/people/${request.hash(this.title)}`)
        let content = ''
        for (const key in json) content += `<p>${key}: ${json[key]}</p>`
        this.tree.querySelector('p').innerHTML = content
    }
}
