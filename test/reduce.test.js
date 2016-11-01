import chai from 'chai';
import reduce from './reduce.js';

const expect = chai.expect;

describe('减法测试', function() {
  it('3 减 1 应等于1', function() {
    expect(reduce(3, 1)).to.be.equal(1);
  });
});
