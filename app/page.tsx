import { LocaleProvider } from "./[locale]/locale-provider";
import HomePage from "./[locale]/page";

export default function RootPage() {
  return (
    <LocaleProvider locale="en">
      <HomePage />
    </LocaleProvider>
  );
}
