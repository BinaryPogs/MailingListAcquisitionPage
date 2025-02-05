// Animation.tsx
import { Gradient } from './Gradient';

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Gradient />
    </div>
  );
};
