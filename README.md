# SPA-Template

## App description

Simple template for single-page applications. See <https://github.com/pfnisu/nysse-qtc/> for usage.

## Background

Key objectives for this project:

* Most frontend frameworks are heavyweight and opinionated
    * Provide minimal implementation of composable objects
    * Don't reinvent parts of DOM, let the browser runtime handle stuff
* View persistence is not well supported in some frameworks
    * Provide persistent state by default
    * Support static, on-demand and live-updating content
    * Allow for flexible communication between objects while encouraging proper encapsulation
    * Lightweight lifecycle management
* The concept of frontend routing violates standards and misleads users
    * Use the hash fragment as a compliant way to navigate within a single document

## Author

Niko Suoniemi <pfnisu@outlook.com>

## Technology

* Requires ES6+ features by default, but can be polyfilled with any bundler
* Recommended bundler: esbuild

## Releases

* Latest stable release: v0.5.0
* See tags for version history: <https://github.com/pfnisu/spa-template/tags>

## License

Copyright (C) 2023-2025 Niko Suoniemi <pfnisu@outlook.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
