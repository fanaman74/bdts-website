import { getRequestConfig } from "next-intl/server";

// Stub — will be fully implemented in Task 2 (i18n setup)
export default getRequestConfig(async () => {
  return {
    locale: "en",
    messages: {},
  };
});
