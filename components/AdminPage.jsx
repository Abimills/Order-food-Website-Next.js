import { useRouter } from "next/router";
import styles from "../styles/AddButton.module.css";

const AdminPage = () => {
  const router = useRouter();
  return (
    <div className={styles.mainAddButton} onClick={() => router.push("/admin")}>
      Admin DashBoard
    </div>
  );
};

export default AdminPage;
