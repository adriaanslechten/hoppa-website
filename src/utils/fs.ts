import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "content", "privacy-policy.md");
  const content = fs.readFileSync(filePath, "utf8");

  return {
    props: {
      content,
    },
  };
}
