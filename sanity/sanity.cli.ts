import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8t2zlu0f',
    dataset: 'production',
  },
  deployment: {
    appId: 'j4mbxly7zsdhnhg3l7t6ndml',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
