import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex relative">
      <Input data-slot="input" type={showPassword ? "text" : "password"} className={className} {...props} />
      <Button className={"absolute right-1.5 inset-y-0 my-auto h-[90%]"} size="icon" onClick={() => setShowPassword(t => !t)}>
        {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
      </Button>
    </div>
  );
};
