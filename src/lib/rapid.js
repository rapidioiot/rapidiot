import rapid from 'rapid-io'

const API_KEY = 'NDA1OWE0MWo1b3AzYTJwLnJhcGlkLmlv'
const COLLECTION_NAME = 'data-loggers';
const client = rapid.createClient(API_KEY)

// let dataset = []



export default client
export const collections = client
  .collection(COLLECTION_NAME)

// export dataset
