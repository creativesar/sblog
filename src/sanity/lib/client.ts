import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: "tejg9xv9",
  dataset: "production",
  apiVersion: "2025-01-02",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
