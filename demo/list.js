import ui from '../ui.js'
import request from '../request.js'

export function List() {
    ui.init(this, 'list', false)
    this.tree.innerHTML = '<p>Loading...</p>'
    this.compose = async () => {
        let json = await request.http('https://swapi.dev/api/people')
        this.tree.innerHTML = ''
        for (let i = 0; i < json.results.length;)
            this.tree.innerHTML +=
                `<a target="character=${i + 1}">
                ${json.results[i++].name} &raquo;</a><br/>`
        this.tree.addEventListener('click', this.navigate, true)
    }
}
