'use client';

import ChatWidgetEmbed from '@/components/ChatWidgetEmbed/ChatWidgetEmbed';

const Index = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <ChatWidgetEmbed projectId={params.slug} />
    </div>
  );
};

export default Index;
