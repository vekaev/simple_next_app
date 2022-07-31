# [🔗 https://simple-next-app-zeta.vercel.app 🔗](https://simple-next-app-zeta.vercel.app/)

## 🧾 TODO:

    [x] - render list of items
    [x] - add search by name with autocomplete
    [x] - add filter by category
    [x] - save filters to local storage
    [ ] - add pagination
    [ ] - add debouncing
    [ ] - add request caching (React Query, useSWR, RTK Query)
    [ ] - add onFly request cancellation
    [ ] - add error handling
    [ ] - add SSR functions
    [ ] - add test coverage
    [ ] - add optimization for backend services
    [x] - add dark mode

## 📝 Tech task:

Create a simple React application that shows a list of construction companies, each with the following information:

- Company name
- Logo (you may use a placeholder image, e.g. using https://placekitten.com/)
- Specialties (e.g. Excavation, Plumbing, Electrical)
- City
  The following should be possible:
- Search for a company by typing into a search field. The search term gets matched only against the company name and the list of companies is filtered based on the search term in real time as the user is typing.
- Filter the list using a set of checkboxes to include only those companies which offer a particular speciality (e.g. only Plumbing).
  Create a simple API based on Node.js that returns the list of companies to the frontend. The API can read the data from a simple JSON source, no database setup is required.
