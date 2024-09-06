export const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  export const scrollToBottom = () => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  