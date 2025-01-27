import { Button } from '@/components/ui/button';
import { landingCopy } from '@/conf/landingConfig';

export const FooterCTA = ({ onScrollToTop }: { onScrollToTop: () => void }) => {
  const { footerCta } = landingCopy;

  return (
    <div className="text-center py-12 pb-32">
      <p className="text-lg text-gray-200 mb-6">
        <i>{footerCta.text}</i>
      </p>
      <Button onClick={onScrollToTop}>{footerCta.button}</Button>
    </div>
  );
};
