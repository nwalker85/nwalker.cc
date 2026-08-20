import { describe, expect, it } from 'vitest'
import {
  buildPersonSchema,
  buildWebSiteSchema,
  createGraph,
} from '../schema'

describe('schema helpers', () => {
  it('describes Nathan Walker as a disambiguated AI architecture entity', () => {
    const person = buildPersonSchema()

    expect(person['@type']).toBe('Person')
    expect(person.name).toBe('Nathan Walker')
    expect(person.alternateName).toContain('nwalker85')
    expect(person.alternateName).toContain('nwalker.cc')
    expect(person.disambiguatingDescription).toMatch(/nwalker\.cc/)
    expect(person.url).toBe('https://nwalker.cc/')
    expect(person.sameAs).toContain('https://github.com/nwalker85')
    expect(person.knowsAbout).toContain('AI Governance')
    expect(person.knowsAbout).toContain('Enterprise AI Architecture')
  })

  it('builds a graph with website and person entities', () => {
    const graph = createGraph([buildPersonSchema(), buildWebSiteSchema()])

    expect(graph['@context']).toBe('https://schema.org')
    expect(graph['@graph']).toHaveLength(2)
    expect(graph['@graph'][0]['@id']).toBe('https://nwalker.cc/#person')
    expect(graph['@graph'][1]['@id']).toBe('https://nwalker.cc/#website')
  })
})
