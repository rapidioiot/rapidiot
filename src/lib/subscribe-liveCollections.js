import { liveCollections } from './rapid'

export default (onvalue, onerror) => {
  return liveCollections.subscribe(onvalue, onerror);
}