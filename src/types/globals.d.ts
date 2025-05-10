declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
          };
        };
        ready: () => void;
        expand: () => void;
        showAlert: (message: string, callback?: () => void) => void;
        // Добавьте другие методы по мере необходимости
      };
    };
  }
}

export { }
