import {View} from './view.js'
import {request} from './request.js'

export function List() {
    View(this)
    this.tree.innerHTML = '<p>Loading...</p>'
    this.compose = async () => {
        let json = await request.http('https://swapi.dev/api/people')
        this.tree.innerHTML = ''
        for (let i = 0; i < json.results.length;)
            this.tree.innerHTML +=
                `<a target="Info" id="${i + 1}">
                ${json.results[i++].name} &raquo;</a><br/>`
        this.tree.addEventListener('click', this.setView, true)
    }
}
