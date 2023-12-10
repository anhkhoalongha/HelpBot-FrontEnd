import { ClerkProvider } from '@clerk/nextjs';

import HistoryChatWidget from '@/components/HistoryChatWidget/HistoryChatWidget';

const Index = ({ params }: { params: { slug: string } }) => {
  return (
    <ClerkProvider>
      <div>
        <HistoryChatWidget conversationID={params.slug} />
      </div>
    </ClerkProvider>
  );
};

export default Index;
