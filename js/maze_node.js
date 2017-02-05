import { Util } from './util';

export default class Node {
  constructor (value) {
    this.value = value || null;
    this.parent = null;
    this.children = [];
  }

  addParent(parent) {
    this.parent = parent;

    if (this.parent) {
      this.parent.children.push(this);
    }
  }

  addChild(child) {
    child.addParent(this);
  }

  hasValue(val) {
    return Util.equalArrays(this.value, val);
  }

  dfs(target) {
    if (this.hasValue(target)) { return this; }

    for (let i = 0; i < this.children.length; i++) {
      let result = this.children[i].dfs(target);

      if (result) {
        return result;
      }
    }

    return null;
  }
}
