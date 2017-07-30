import rapid from 'rapid-io'

const API_KEY = 'NDA1OWE0MWo1b3AzYTJwLnJhcGlkLmlv'
const COLLECTION_NAME = 'data-loggers';
const INVENTORY_NAME = 'datalogger-inventory';

const client = rapid.createClient(API_KEY)

export default client
export const collections = client
  .collection(COLLECTION_NAME)

export const liveCollections = client
  .collection('data-loggers-live');

export const inventory = client
  .collection(INVENTORY_NAME)

