import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => (
  <UserProfile path="/dashboard/user-profile" routing="path" />
);

export default UserProfilePage;
