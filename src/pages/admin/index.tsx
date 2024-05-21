import { NextPage } from "next";
import dynamic from "next/dynamic";
import useTokenQuery from "../../hooks/useTokenQuery"

const AdminApp = dynamic(() => import("../../components/Admin/AdminApp"), { ssr: false });

const Admin: NextPage = () => {
  const token = useTokenQuery()
  console.log(token)
  return <AdminApp />;
};

export default Admin;
