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

## Default ReadMe NextJS info

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

