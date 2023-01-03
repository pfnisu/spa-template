import {View} from './view.js'
import {request} from './request.js'

export function StarWarsLive() {
    View(this, 'Star Wars Person', true)
    this.tree.innerHTML = '<p>Loading...</p>'
    this.interval = 5000
    this.person = 0
    this.compose = async () => {
        let json = await request.http(`https://swapi.dev/api/people/${++this.person}`)
        this.tree.innerHTML =
            `<h1>${json.name}</h1>
            <p>height: ${json.height}cm</p>
            <p>weight: ${json.mass}kg</p>`
        if (this.person > 9) this.person = 0
    }
}
