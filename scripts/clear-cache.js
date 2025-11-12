const path = require("path");
const fs = require("fs/promises");

async function clearCache() {
  const cachePath = path.resolve(__dirname, "..", "node_modules", ".cache");

  try {
    await fs.access(cachePath, 1);
    await fs.rm(cachePath, { recursive: true, force: true });
    console.log("✅ Папка .cache успешно удалена");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("ℹ️ Папка .cache не найдена");
    } else {
      console.error("❌ Ошибка при удалении .cache:", error.message);
    }
  }
}

if (require.main === module) {
  clearCache();
}
