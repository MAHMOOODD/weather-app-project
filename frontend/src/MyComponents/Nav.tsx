import { ModeToggle } from "@/MyComponents/mode-toggle";

export default function Navbar() {
  return (
   <div className=" flex justify-start  w-full max-w-md ">
        <div >
          <ModeToggle />
        </div>
      </div>
  );
}