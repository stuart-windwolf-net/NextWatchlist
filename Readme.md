# Company Watchlist

Company Watchlist is a single page Web application for watching the latest prices of ASX listed companies.

## Installation

You will need the following installed in order to setup and run Company Watchlist:
```bash
DotNet Core 6
Git
Visual Studio Code
node
npm
```

The Company Watchlist may be setup in Visual Studio Code by following this process:

```bash
Create a folder name WatchList 
Open Visual Studio Code from this folder
```

Pull code from the git repository using a VSCode terminal window:
``` bash
git init 
git pull <remote> <branch> 
```

Build and run the Web API for Company Watchlist in the terminal window:
``` bash
cd API
dotnet build
dotnet run
```

Using a 2nd terminal window restore build and run the User Interface:
``` bash
cd .\client-app\
npm install
npm start
```

## Usage

At the Company Watchlist HOME PAGE or the Nav bar on top you may navigate to the list of watched ASX companies.

From the List of Watched Companies you can: 
1.  View the list of stored companies (Watchlist).
2.  "View" the latest ASX pricing information for that company.
3.  "Delete" a company from your list of stored companies.

Using the Company Code button you can:
1.  Add a new company to the list and immediately view it's pricing by enter an ASX ticker code that is not currently stored in your list.
2.  Jump straight to viewing a company that is currently stored in your list.
