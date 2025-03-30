describe('Quiz App Tests', () => {
    beforeEach(() => {
        cy.visit('index.html');
    });

    it('Checks UI Elements', () => {
        cy.get('div#questions').children('div').should('have.length', 5);
        cy.get('input[type="radio"]').should('have.length', 20);
        cy.get('button#submit').should('exist');
        cy.get('div#score').should('be.empty');
    });

    it('Verifies Questions Match Expected Order', () => {
        const expectedQuestions = [
            "What is 2 + 2?",
            "What is the capital of France?",
            "Which is the largest planet?",
            "Who wrote 'Hamlet'?",
            "What is the square root of 16?"
        ];

        cy.get('div#questions > div').each(($ele, index) => {
            expect($ele.text().trim().startsWith(expectedQuestions[index])).to.be.true;
        });
    });

    it('Saves Progress in Session Storage', () => {
        cy.get('input[type="radio"]').first().click();
        cy.reload();
        cy.get('input[type="radio"][checked="true"]').should('have.length', 1);
    });

    it('Calculates and Stores Score', () => {
        cy.get('input[type="radio"]').each(($ele, index) => {
            cy.wrap($ele).first().click();
        });

        cy.get('button#submit').click();
        cy.get('div#score').should('not.be.empty');

        cy.window().its('localStorage.score').should('not.be.null');
    });
});
