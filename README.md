# BD2 Index

A Brown Dust 2 fan site for banner schedules, costume ratings, tier lists, and community resources.

## Schedule data

Edit [`src/data/dates.json`](./src/data/dates.json) to update banner and Powder of Hope shop entries:

- Set `lastUpdated` to the date the schedule data was last reviewed, using `YYYY-MM-DD`.
- Add or update entries in `entries`, with `type` set to `banner` or `powder`.
- Use `startDate` and `endDate` in `YYYY-MM-DD` format. The page heading's date range is calculated from these entries.
- Banner entries also use `isRerun` and `isLimited`; entries with a known costume should use its `costumeId`.

The schedule page displays the `lastUpdated` date so visitors can assess how current the information is.

## Development

Install dependencies with `npm install`, then start the local development server with `npm run dev`. Run `npm run build` to create the production site.
