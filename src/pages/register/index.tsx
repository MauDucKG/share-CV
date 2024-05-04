import Register from "src/routes/Register"
import MetaConfig from "src/components/MetaConfig";
import { CONFIG } from "site.config";

export default function RegisterPage() {
  const meta = {
    title: "Register",
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  };

  return (
    <>
      <MetaConfig {...meta} />
      <Register />
    </>
  );
}

