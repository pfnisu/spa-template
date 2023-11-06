import ui from '../ui.js'
import {Static} from './static.js'
import {LiveMenu} from './livemenu.js'
import {LiveView} from './liveview.js'

ui.bind(
    [new Static(), new LiveMenu(), new LiveView()],
    document.querySelector('main'),
    document.querySelector('nav'),
    ' | spa-template')
