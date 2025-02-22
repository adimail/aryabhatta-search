interface UserProfileProps {
  userid: string;
}

export function UserProfile({ userid }: UserProfileProps) {
  return (
    <div>
      <h1>User Profile for {userid}</h1>
    </div>
  );
}
