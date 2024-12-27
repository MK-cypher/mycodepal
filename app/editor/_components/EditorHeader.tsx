import Logo from "@/app/(auth)/components/Logo";
import RunCodeBtn from "./RunCodeBtn";
import ThemeSelector from "./ThemeSelector";
import UserBtn from "@/components/UserBtn";
import MobileThemeSelector from "./MobileThemeSelector";
import ProBtn from "@/components/payment/ProBtn";

export default function EditorHeader() {
  return (
    <div className="p-2 px-3 rounded-lg bg-secondary flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Logo full />
      </div>
      <div>
        <RunCodeBtn />
      </div>
      <div className="flex items-center gap-3">
        <div className="sm:hidden flex justify-center items-center">
          <MobileThemeSelector />
          <div className="fixed bottom-5 right-5 z-30">
            <ProBtn editor />
          </div>
        </div>
        <div className="max-sm:hidden flex items-center gap-3">
          <ThemeSelector />
          <ProBtn editor />
          <UserBtn />
        </div>
      </div>
    </div>
  );
}
