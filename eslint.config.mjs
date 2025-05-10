import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Ваши кастомные правила
    rules: {
      // Отключаем конкретные правила
      "@typescript-eslint/no-unused-vars": "off", // Полное отключение
      "@typescript-eslint/no-explicit-any": "warn", // Только предупреждение
      
      // Или более тонкая настройка:
      "@typescript-eslint/no-unused-vars": [
        "warn", // Уровень предупреждения
        { 
          "argsIgnorePattern": "^_", // Игнорировать переменные, начинающиеся с _
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    },
    // Настройки для конкретных файлов
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        rules: {
          "@typescript-eslint/no-unused-vars": "warn"
        }
      },
      {
        files: ["**/*.test.ts", "**/*.spec.ts"],
        rules: {
          "@typescript-eslint/no-unused-vars": "off"
        }
      }
    ]
  }
];

export default eslintConfig;