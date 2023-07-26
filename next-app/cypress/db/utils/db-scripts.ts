import * as sqlite3 from "sqlite3"

const DBSOURCE = "D:/Development/Study/React/Study/CPU Onboarding/Next/WatchList-4/API/Watchlist-Dev.db"
const delQuery = "DELETE FROM CompanyHeaders";
const fill4Query =
    "INSERT INTO CompanyHeaders (id, symbol, sector, dateListed, displayName) VALUES " +
    "(1, 'CPU', 'Information Technology', '1994-05-27', 'COMPUTERSHARE LIMITED.')," +
    "(2, 'WES', 'Consumer Discretionary', '1984-11-15', 'WESFARMERS LIMITED')," +
    "(3, 'BHP', 'Materials', '1885-08-13', 'BHP GROUP LIMITED')," +
    "(4, 'ANZ', 'Financials', '1969-09-30', 'AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED')";

 const fillQuery =
    "INSERT INTO CompanyHeaders (id, symbol, sector, dateListed, displayName) VALUES " +
    "(1, 'AAA', 'Finance', '1984-01-01', 'NonComputershare1')," +
    "(2, 'AAB', 'Finance', '1984-01-01', 'NonComputershare2')," +
    "(3, 'AAC', 'Finance', '1984-01-01', 'NonComputershare3')," +
    "(4, 'AAD', 'Finance', '1984-01-01', 'NonComputershare4')," +
    "(5, 'AAE', 'Finance', '1984-01-01', 'NonComputershare5')," +
    "(6, 'AAF', 'Finance', '1984-01-01', 'NonComputershare6')," +
    "(7, 'AAG', 'Finance', '1984-01-01', 'NonComputershare7')," +
    "(8, 'AAH', 'Finance', '1984-01-01', 'NonComputershare8')," +
    "(9, 'AAI', 'Finance', '1984-01-01', 'NonComputershare9')," +
    "(10, 'AAJ', 'Finance', '1984-01-01', 'NonComputershare10')," +
    "(11, 'AAK', 'Finance', '1984-01-01', 'NonComputershare11')," +
    "(12, 'AAL', 'Finance', '1984-01-01', 'NonComputershare12')," +
    "(13, 'AAM', 'Finance', '1984-01-01', 'NonComputershare13')," +
    "(14, 'AAN', 'Finance', '1984-01-01', 'NonComputershare14')," +
    "(15, 'AAO', 'Finance', '1984-01-01', 'NonComputershare15')," +
    "(16, 'AAP', 'Finance', '1984-01-01', 'NonComputershare16')," +
    "(17, 'AAQ', 'Finance', '1984-01-01', 'NonComputershare17')," +
    "(18, 'AAR', 'Finance', '1984-01-01', 'NonComputershare18')," +
    "(19, 'AAS', 'Finance', '1984-01-01', 'NonComputershare19')," +
    "(20, 'AAT', 'Finance', '1984-01-01', 'NonComputershare20')";

const safeToReset = process.env.NODE_ENV === "development" || process.env.CYPRESS;

export const dbRun = (sql:string, type:string): void => {
    if (!safeToReset) {
        console.log("WARNING: database reset unavailable outside development environment!");
        return;
    }

    const db = new sqlite3.Database(DBSOURCE, (err: any) => {
        if (err) {
            // Cannot open database
            console.error(err.message)
            return;
        } else {
             db.all(sql, (err: any) => {
                if (err !== null) {
                    console.log(`Error executing sql for type: ${type}`, err);
                } else {
                    console.log(`Successful execution of sql for ${type}`);
                }
            });
            db.close();
        }
    })
}

export const dbDelete = (): void => {
    dbRun(delQuery, "delete");
}

export const dbFill = (): void => {
    dbRun(delQuery, "delete");
    dbRun(fillQuery, "fill20");
}

export const dbReset = (): void => {
    dbRun(delQuery, "delete");
    dbRun(fill4Query, "fill4");
}

