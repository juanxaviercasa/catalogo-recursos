import fs from "node:fs";
import path from "node:path";

const distPublic = path.resolve("dist/public");
if (fs.existsSync(distPublic)) {
  fs.copyFileSync(path.join(distPublic, "index.html"), path.join(distPublic, "404.html"));
  fs.writeFileSync(path.join(distPublic, ".nojekyll"), "");
  console.log("Postbuild: 404.html y .nojekyll generados para GitHub Pages.");
}
