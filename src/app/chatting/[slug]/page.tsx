import '../../../styles/auth/style.css';

import { ClerkProvider } from '@clerk/nextjs';

import ChattingWidget from '@/components/ChattingWidget/ChattingWidget';

const Index = ({ params }: { params: { slug: string } }) => {
  return (
    <ClerkProvider>
      <div>
        <ChattingWidget projectId={params.slug} />
      </div>
    </ClerkProvider>
  );
};

export default Index;
