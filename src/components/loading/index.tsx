import logo from "@/assets/iconLogin.png"; 
import styles from "./style.module.css"

export default function Loading() {
  return (
    <div className={styles.container}>
      <img
        src={logo}
        alt="Logo"
        className={styles.spin3d}
      />
    </div>
  );
}
