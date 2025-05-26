import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { BiLike } from "react-icons/bi";

export default function LikeButton({
    videoId,
    initialLiked,
    initialLikesCount,
}) {
    const { auth } = usePage().props;
    const [liked, setLiked] = useState(initialLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const { processing, post, delete: destroy } = useForm({});

    const handleLike = () => {
        if (!auth.user) {
            // Optionally redirect to login or show a message
            return;
        }

        if (liked) {
            destroy(`/videos/${videoId}/unlike`, {
                preserveScroll: true,
                onSuccess: () => {
                    setLiked(false);
                    setLikesCount((prevCount) => prevCount - 1);
                },
            });
        } else {
            post(
                `/videos/${videoId}/like`,

                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setLiked(true);
                        setLikesCount((prevCount) => prevCount + 1);
                    },
                }
            );
        }
    };
    return (
        <button
            onClick={handleLike}
            disabled={processing}
            className={`flex items-center gap-1 ${
                liked ? "text-blue-500" : "text-gray-500"
            }`}
        >
            <BiLike
                size={"1.5rem"}
                className={`${liked ? "text-blue-500" : "text-gray-500"}`}
            />
            <span className="text-black">{likesCount}</span>
        </button>
    );
}
