/// <reference types="cypress" />

import { dbDelete, dbFill, dbReset } from "../db/utils/db-scripts";

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default (on, config) => {
    // eslint-disable-next-line no-param-reassign
    //config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
    // to access within a test function:
    //  Cypress.env("REVALIDATION_SECRET")
  
    on("task", {
      "db:delete": () => dbDelete(),
      "db:fill": () => dbFill(),
      "db:reset": () => dbReset()
    });
  
    return config;
  };
  