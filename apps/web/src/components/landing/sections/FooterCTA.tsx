import { Button } from '@/components/ui/button';
import { landingCopy } from '@/conf/landingConfig';

export const FooterCTA = ({ onScrollToTop }: { onScrollToTop: () => void }) => {
  const { footerCta } = landingCopy;

  return (
    <div className="text-center py-12 pb-32">
      <p className="font-twk text-lg text-gray-200 mb-6 tracking-tight">{footerCta.text}</p>
      <Button onClick={onScrollToTop} className="font-twk">
        {footerCta.button}
      </Button>
    </div>
  );
};
