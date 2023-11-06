# SPA-Template

## App description

Simple template for single-page applications. Repo contains an example app built with the template.

## Background

Key objectives for this project:

* Most frontend frameworks are heavyweight and opinionated
    * Provide minimal implementation of composable objects
    * Don't reinvent parts of DOM, let the browser runtime handle stuff
* View persistence is not well supported in most frameworks
    * Provide persistent state by default
    * Support static, on-demand and live-updating content
* The concept of frontend routing violates standards and misleads users
    * Use the hash fragment as a compliant way to navigate within a single document

## Author

Niko Suoniemi <niko@tamperelainen.org>

## Technology

* Requires ES6+ features by default, but can be polyfilled with any bundler
* Example app is bundled with esbuild

## Releases

* v0.2.0          Reorganize files
* v0.1.0          Initial version

## Licence

Copyright (C) 2023 Niko Suoniemi <niko@tamperelainen.org>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>
