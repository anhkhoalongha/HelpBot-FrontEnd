import '../../styles/auth/style.css';

import { ClerkProvider } from '@clerk/nextjs';

import ChatWidget from '@/components/ChatWidget/ChatWidget';

const Index = () => {
  return (
    <ClerkProvider>
      <div>
        <ChatWidget />
      </div>
    </ClerkProvider>
  );
};

export default Index;
