import Profile from "src/routes/Profile"
import MetaConfig from "src/components/MetaConfig";
import { CONFIG } from "site.config";
export default function ProfilePage() {
  const meta = {
    title: "Profile",
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  };

  return (
    <>
      <MetaConfig {...meta} />
      <Profile />
    </>
  );
}

