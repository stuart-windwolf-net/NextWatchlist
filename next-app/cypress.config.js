import { defineConfig } from "cypress";
import { dbDelete, dbFill, dbReset } from "./cypress/db/utils/db-scripts";

export default defineConfig({
  e2e: {
    video: false,
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          // cy.task("log", "my message");
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          console.log(message +'\n\n');
          return null;
        },
        "db:delete":() => {
          dbDelete(); return null;
        },
        "db:reset":() => {
          dbReset(); return null;
        },
        "db:fill":() => {
          dbFill(); return null;
        }
      })
    },    
    //baseUrl: 'http://localhost:3000',
  },
});

