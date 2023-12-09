import { PeterNameGuard } from './peter-name.guard';
import { of } from 'rxjs';
describe('PeterNameGuard', () => {
  it('should be defined', () => {
    expect(new PeterNameGuard()).toBeDefined();
  });
});
