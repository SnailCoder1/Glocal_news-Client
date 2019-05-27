describe('Visitor can read an article', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      response: 'fixture:list_of_articles.json',
      status: 200
    })
    cy.visit('http://localhost:3001')
  })

  it('shows full article when clicked', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles/1',
      response: 'fixture:full_article.json',
      status: 200
    })
    cy.get("#1").click()

    let article = ["#title_1", "#ingress_1", "#body_1", "#photo_1", "#written_1", "#date_1",]

    article.forEach(element => {
      cy.get(element)
    })
  })
})