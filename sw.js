import {View} from './view.js'
import {request} from './request.js'

export function StarWars() {
    View(this, 'Star Wars List', false)
    this.tree.innerHTML = '<p>Loading...</p>'
    this.compose = async () => {
        let json = await request.http('https://swapi.dev/api/people')
        this.tree.innerHTML = `<h1>${this.title}</h1>`
        for (const person of json.results)
            this.tree.innerHTML += `<p>${person.name}</p>`
    }
}
