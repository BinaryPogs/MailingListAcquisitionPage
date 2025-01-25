import { useCopy } from '@/hooks/useCopy';
import { Button } from '@/components/ui/button';

export const FooterCTA = ({ onScrollToTop }: { onScrollToTop: () => void }) => {
  const config = useCopy();
  const { footerCta } = config;

  return (
    <div className="text-center py-12">
      <p className="text-lg text-gray-200 mb-6">
        <i>{footerCta.text}</i>
      </p>
      <Button onClick={onScrollToTop}>{footerCta.button}</Button>
    </div>
  );
};
