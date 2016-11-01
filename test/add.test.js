import chai from 'chai';
import add from './add.js';

let expect = chai.expect;
describe('加法函数测试', function() {
  it('1 加 1 应等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
