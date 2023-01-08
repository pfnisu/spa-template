import ui from './ui.js'
import request from './request.js'

export function LiveView() {
    ui.view(this, 'Live view', true)
    this.tree.innerHTML = '<p>Loading...</p>'
    this.person = 0
    this.interval = request.cookie('interval') ?? 20000
    this.compose = async () => {
        let json = await request.http(`https://swapi.dev/api/people/${++this.person}`)
        this.tree.innerHTML =
            `<h1>${json.name}</h1>
            <p><a>Toggle</a>
            View updates every ${this.interval / 1000}s, saved to cookie</p>
            <p>height: ${json.height}cm</p>
            <p>weight: ${json.mass}kg</p>`
        this.tree.querySelector('a').addEventListener('click', () => {
            this.interval = this.interval == 5000 ? 20000 : 5000
            this.stop()
            this.start(request.cookie('interval', this.interval))
        })
        if (this.person > 9) this.person = 0
    }
}
