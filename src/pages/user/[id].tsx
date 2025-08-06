import { useRouter } from "next/router";
import styles from "./user.module.css";
import Link from "next/link";

const users = [
  { id: 1, name: "User One", score: 100 },
  { id: 2, name: "User Two", score: 90 },
  { id: 3, name: "User Three", score: 80 },
  { id: 4, name: "User Four", score: 70 },
  { id: 5, name: "User Five", score: 60 },
  { id: 6, name: "User Six", score: 50 },
  { id: 7, name: "User Seven", score: 40 },
  { id: 8, name: "User Eight", score: 30 },
  { id: 9, name: "User Nine", score: 20 },
  { id: 10, name: "User Ten", score: 10 },
];
const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = users.find((user) => user.id.toString() === id);

  if (!user) return <div className={styles.profile}>User not found</div>;

  return (
    <div className={styles.profile}>
      <h1 className={styles.heading}>{user.name}</h1>
      <p className={styles.text}>Score: {user.score}</p>
      <Link href="/">
        <div className={styles.backLink}>Back to leaderboard</div>
      </Link>
    </div>
  );
};

export default UserPage;
