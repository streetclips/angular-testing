import { CategoriesMock } from '../../src/app/core/mocks/category.mock'

describe('Home', () => {

  beforeEach(() => {
    cy.intercept(
      { method: 'get', url: /categories/ },
      { body: CategoriesMock }
    ).as('getCategories')
  })

  it('Get and shows categories', () => {
    cy.visit('/')
    cy.wait('@getCategories')

    cy.get('.category-item').and('have.length', 2)
  })

  it('Navigate to category', () => {
    cy.visit('/')
    cy.wait('@getCategories')

    cy.get('.category-item').first().click()
    cy.url().should('include', '/category/1')
  })

  it('Type, search and redirects', () => {
    cy.visit('/')
    cy.wait('@getCategories')

    cy.get('input').type('foo')
    cy.get('button#search-btn').click()

    cy.url()
      .should('include', '/search')
      .then((url) => {
        const newUrl = new URL(url)
        const urlParams = new URLSearchParams(newUrl.search)
        expect(urlParams.get('title')).to.be.equal('foo')
      })
  })
})
