/**
 * Queu class
 * Simple javascript Queue class implementation
 */
class Queu {

  /**
   * Constructor function
   * @constructor
   */
  constructor() {
    this.queue = [];
    this.offset = 0;
  }

  /**
   * Get length
   * @return {Number} - Length
   */
  getLength() {
    return (this.queue.length - this.offset);
  }

  /**
   * Checks if empty
   * @return {Boolean} - True is empty and false is not.
   */
  isEmpty() {
    return (this.queue.length === 0);
  }

  /**
   * Add item to queue
   * @param  {Object|String|number} - item Item for queue
   */
  add(item) {
    this.queue.push(item);
    this.offset += 1;
  }

  /**
   * Remove the first element
   * @return {Object|String|number} - Return the item
   */
  shift() {
    let item = null;

    if (this.queue.length) {
      item = this.queue.shift();
    }

    return item;
  }

  /**
   * Remove the last element
   * @return {Object|String|number} - Return the item
   */
  pop() {
    let item = null;

    if (this.queue.length) {
      item = this.queue.pop();
    }

    return item;
  }

  /**
   * Get last item
   * @return {object|string|number} - Last item
   */
  last() {
    return (this.queue.length > 0 ? this.queue[this.queue.length - 1] : null);
  }

  /**
   * Get first item
   * @return {object|string|number} - First item
   */
  first() {
    return (this.queue.length > 0 ? this.queue[0] : null);
  }

}

(() => {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Queu;
  } else if (typeof define === 'function' && define.amd) {
    define([], () => {
      return Queu;
    });
  } else {
    window.Queu = Queu;
  }
})();
