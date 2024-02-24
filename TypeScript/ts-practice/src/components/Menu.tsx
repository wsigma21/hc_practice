import { MenuButton } from "./MenuButton";

export const Menu = () => {
  return (
    <div className="flex justify-center mb-5">
      <MenuButton thisAttribute={"allUser"}>全員</MenuButton>
      <MenuButton thisAttribute={"student"}>生徒のみ</MenuButton>
      <MenuButton thisAttribute={"mentor"}>メンターのみ</MenuButton>
    </div>
  )
}