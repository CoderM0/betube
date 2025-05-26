import { FaYoutube } from "react-icons/fa";

export default function ApplicationLogo(props) {
    return (
        <div class="flex items-center justify-start gap-2 h-16 bg-white px-4">
            <FaYoutube size={"3.3rem"} color="red" />
            <p className="font-bold">BeTube</p>
        </div>
    );
}
