/// <reference types="cypress"/>

//import { dbDelete } from "../../../__tests__/db/utils/db-scripts";

describe("Home Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    // eslint-disable-next-line jest/expect-expect
    it("should render the home page message", () => {
      cy.get("h2").contains("Company Watch List");
    });
  });

  