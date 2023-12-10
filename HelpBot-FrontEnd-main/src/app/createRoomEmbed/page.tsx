import '../../styles/auth/style.css';

// import { ClerkProvider } from '@clerk/nextjs';
import CreateRoomEmbed from '@/components/createRoomEmbed/createRoomEmbed';

const Index = () => {
  return (
    // <ClerkProvider>
    <div>
      <CreateRoomEmbed />
    </div>
    // </ClerkProvider>
  );
};

export default Index;
