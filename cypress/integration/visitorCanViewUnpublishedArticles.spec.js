describe('Visitor can view unpublished articles', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()
  })

  it('by seeing a correct page headline', () => {
    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()
    cy.contains('Unpublished Articles')
  })
  
  it('by seeing a list of unpublished articles on Reviews page', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      response: 'fixture:list_of_articles_with_review_count.json',
      status: 200
    })

    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()

    let articles = [
      ["#1", "#title_1", "#ingress_1", "#photo_1"],
      ["#2", "#title_2", "#ingress_2", "#photo_2"],
    ]

    articles.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })
  })

})
