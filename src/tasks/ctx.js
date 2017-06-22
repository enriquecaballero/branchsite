/** Global context that is shared across the multiple task sets **/

class Context {
  constructor () {
    this.ctx = {};
  }
  set = item => {
    this.ctx = Object.assign ({}, this.ctx, item);
  };
  get = key => {
    return key ? this.ctx[key] : this.ctx;
  };
}

export default new Context ();
