import { expect } from 'bun:test'
import * as matchers from '@testing-library/jest-dom/matchers'
import { Window } from 'happy-dom'

// Setup DOM globals
const window = new Window()
const document = window.document

global.document = document
global.window = window as any // eslint-disable-line @typescript-eslint/no-explicit-any
global.navigator = window.navigator
global.HTMLElement = window.HTMLElement

expect.extend(matchers)
