describe('Драг-дроп Ингредиентов', () => {    
	before(() => {
      cy.visit('http://localhost:3000');
	  cy.contains('Соберите бургер');
    });
	
	it('Драг-дроп Ингредиентов', () => {
		cy.get('div').contains('Краторная булка N-200i').trigger('dragstart');
		cy.get('[data-test="constructor"]')  
          .trigger('drop');
		cy.get('div').contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
        cy.get('[data-test="constructor-main-sauce"]')   
          .trigger('drop')  ;
		cy.get('div').contains('Соус традиционный галактический').trigger('dragstart');
        cy.get('[data-test="constructor-main-sauce"]')
          .trigger('drop');
		  
       cy.get('div').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
        cy.get('[data-test="constructor"]')  
          .trigger('drop')
        
    });
	
});
