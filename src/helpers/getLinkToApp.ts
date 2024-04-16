export const getLinkToApp = (href: string) =>
  `https://vk.com/app${import.meta.env.VITE_APP_ID}${href}`;
