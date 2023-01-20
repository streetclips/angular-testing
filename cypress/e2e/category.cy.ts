describe('Home', () => {

  beforeEach(() => {
    cy.intercept(
      { method: 'get', url: /categories/ },
      { fixture: 'category.json' }
    ).as('getCategory')

    cy.intercept(
      { method: 'get', url: /products/ },
      { fixture: 'products.json' }
    ).as('getProducts')
  })

  it.only('Show category name', () => {
    cy.visit('/category/1/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('h1#category-name').and('include.text', 'Category 1')
  })

  it.only('Get and shows products', () => {
    cy.visit('/category/1/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('.card').and('have.length', 2)
  })

})
