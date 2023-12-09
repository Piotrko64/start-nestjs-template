import { PeterNameGuard } from './peter-name.guard';
describe('PeterNameGuard', () => {
  it('should be defined', () => {
    expect(new PeterNameGuard()).toBeDefined();
  });
});
