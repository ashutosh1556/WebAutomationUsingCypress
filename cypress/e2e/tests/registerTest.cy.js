import { registerPage } from "../../pages/registerPage";
import registrationData from "../../fixtures/registrationData.json";

const registerationPage = new registerPage();

describe("Validate Registration Workflow", () => {
    it("should register a new user", () => {
        registerationPage
            .openURL()
            .enterFirstName(registrationData.FirstName)
            .enterLastName(registrationData.LastName)
            .enterEmail(registrationData.Email)
            .enterTelephone(registrationData.Telephone)
            .enterPassword(registrationData.Password)
            .confirmPassword(registrationData.ConfirmPassword)
            .clickPrivacyPolicyCheckBox()
            .clickContinueButton()
            .verifySuccessMessage(registrationData.SuccessMessgae)

            // registerationPage.openURL()
            // registerationPage.enterFirstName(registrationData.FirstName)
            // registerationPage.enterLastName(registrationData.LastName)
            // registerationPage.enterEmail(registrationData.Email)
            // registerationPage.enterTelephone(registrationData.Telephone)
            // registerationPage.enterPassword(registrationData.Password)
            // registerationPage.confirmPassword(registrationData.ConfirmPassword)
            // registerationPage.clickPrivacyPolicyCheckBox()
            // registerationPage.clickContinueButton()
            // registerationPage.verifySuccessMessage(registrationData.SuccessMessgae)
    })
})