export class registerPage {

    WebLocators = {
        firstNameInputField: '#input-firstname',
        lastNameInputField: '#input-lastname',
        emailInputField: '#input-email',
        telephoneInputField: '#input-telephone',
        passwordInputField: '#input-password',
        confirmPasswordInputField: '#input-confirm',
        privacyPolicyCheckBox: "input[name='agree']",
        continueButton: 'input[type="submit"]'
    }

    enterFirstName(firstName) {
        cy.get(this.WebLocators.firstNameInputField)
            .should('be.visible')
            .clear()
            .type(firstName, { force: true });
        return this
    }

    enterLastName(lastName) {
        cy.get(this.WebLocators.lastNameInputField)
            .should('be.visible')
            .clear()
            .type(lastName, { force: true });
        return this
    }

    enterEmail(email) {
        cy.get(this.WebLocators.emailInputField)
            .should('be.visible')
            .clear()
            .type(email, { force: true });
        return this
    }

    enterTelephone(telephone) {
        cy.get(this.WebLocators.telephoneInputField)
            .should('be.visible')
            .clear()
            .type(telephone, { force: true });
        return this
    }

    enterPassword(password) {
        cy.get(this.WebLocators.passwordInputField)
            .should('be.visible')
            .clear()
            .type(password, { force: true });
        return this
    }

    confirmPassword(confirmPassword) {
        cy.get(this.WebLocators.confirmPasswordInputField)
            .should('be.visible')
            .clear()
            .type(confirmPassword, { force: true });
        return this
    }

    clickPrivacyPolicyCheckBox() {
        cy.get(this.WebLocators.privacyPolicyCheckBox)
            .click()
        return this
    }

    clickContinueButton() {
        cy.get(this.WebLocators.continueButton)
            .click()
        return this
    }

    verifySuccessMessage(message) {
        cy.contains(message).should('be.visible');
        return this
    }

    openURL() {
        cy.visit(Cypress.env('URL')); 
        // cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
        return this 
    }
}