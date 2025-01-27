// Animation.tsx
import { Gradient } from './Gradient';
import { Particles } from './Particles';

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Gradient />
      <Particles />
    </div>
  );
};
