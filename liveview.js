import {View} from './view.js'
import {request} from './request.js'

export function LiveView() {
    View(this, 'Live view', true)
    this.tree.innerHTML = '<p>Loading...</p>'
    this.person = 0
    this.compose = async () => {
        let json = await request.http(`https://swapi.dev/api/people/${++this.person}`)
        this.tree.innerHTML =
            `<h1>${json.name}</h1>
            <p>View updates every 10s</p>
            <p>height: ${json.height}cm</p>
            <p>weight: ${json.mass}kg</p>`
        if (this.person > 9) this.person = 0
    }
}
