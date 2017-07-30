import { collections } from './rapid'

export default (onvalue, onerror) => {
  return collections.subscribe(onvalue, onerror);
}