import { inventory } from './rapid'

export default (onvalue, onerror) => {
  return inventory
    .order({ nodeID: 'asc' })
    .subscribe(onvalue, onerror);
}