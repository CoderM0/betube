import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BiDislike } from "react-icons/bi";

export default function DisLikeButton({
    videoId,
    initialDisLiked,
    initialDisLikesCount,
}) {
    const { auth } = usePage().props;
    const [disliked, setDisLiked] = useState(initialDisLiked);
    const [dislikesCount, setDisLikesCount] = useState(initialDisLikesCount);
    const { processing, post, delete: destroy } = useForm({});

    const handleLike = () => {
        if (!auth.user) {
            // Optionally redirect to login or show a message
            return;
        }

        if (disliked) {
            destroy(`/videos/${videoId}/undislike`, {
                preserveScroll: true,
                onSuccess: () => {
                    setDisLiked(false);
                    setDisLikesCount((prevCount) => prevCount - 1);
                },
            });
        } else {
            post(
                `/videos/${videoId}/dislike`,

                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setDisLiked(true);
                        setDisLikesCount((prevCount) => prevCount + 1);
                    },
                }
            );
        }
    };
    useEffect(() => {
        setDisLiked(initialDisLiked);
    }, [initialDisLiked]); // Re-run effect when initialLiked prop changes

    useEffect(() => {
        setDisLikesCount(initialDisLikesCount);
    }, [initialDisLikesCount]);
    return (
        <button
            onClick={handleLike}
            disabled={processing}
            className={`flex items-center gap-1 ${
                disliked ? "text-blue-500" : "text-gray-500"
            }`}
        >
            <BiDislike
                size={"1.5rem"}
                className={`${disliked ? "text-blue-500" : "text-gray-500"}`}
            />
            <span className="text-black">{dislikesCount}</span>
        </button>
    );
}
