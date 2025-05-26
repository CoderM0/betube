import { useForm, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { TbLoader } from "react-icons/tb";

export default function CommentItem({ comment }) {
    const { post, setData, processing, reset, data } = useForm({
        comment_text: "",
    });
    const { user } = usePage().props.auth;
    const [openReplies, setOpenReplies] = useState(false);
    const [addReplies, setAddReplies] = useState(false);
    const add_reply = (e) => {
        e.preventDefault();
        post(route("user.reply.add", [comment.video_id, comment.id]), {
            preserveScroll: true,
            onSuccess: reset(),
        });
    };
    return (
        <div
            className={`${
                comment.parent_comment_id !== null ? "ml-5  mt-4" : "ml-0"
            }`}
        >
            <div>
                <div className="flex items-start gap-3">
                    <img
                        src={`/storage/${comment.user.avatar}`}
                        alt=""
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="font-bold">{comment.user.name}</p>
                    <p className="text-gray-400 italic text-sm">
                        {formatDistanceToNow(comment.created_at)}
                    </p>
                </div>
                <p className="px-10 italic">{comment.comment_text}</p>
                {comment.parent_comment_id == null && (
                    <div className="ml-10 flex justify-center gap-5 w-1/2">
                        <button onClick={() => setAddReplies(!addReplies)}>
                            {addReplies ? "Cancel" : "Reply"}
                        </button>
                        {comment.replies.length > 0 && (
                            <button
                                onClick={() => setOpenReplies(!openReplies)}
                            >
                                {openReplies ? "Hide Replies" : "View Replies"}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div
                className={` transition-[max-height] duration-200  ${
                    openReplies ? "max-h-80" : "max-h-0"
                } overflow-hidden`}
            >
                {comment.replies &&
                    comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} />
                    ))}
            </div>
            {addReplies ? (
                processing ? (
                    <p className="flex items-center justify-center">
                        <TbLoader
                            color="green"
                            size={"1.5rem"}
                            className="animate-spin"
                        />
                    </p>
                ) : (
                    <form className="my-2 ml-10" onSubmit={add_reply}>
                        <div className="flex items-center relative">
                            <img
                                src={`/storage/${user.avatar}`}
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                            <input
                                type="text"
                                value={data.comment_text}
                                onChange={(e) =>
                                    setData("comment_text", e.target.value)
                                }
                                required
                                placeholder="add a reply.."
                                className="w-11/12 border  rounded-2xl bg-gray-200"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-xl bg-gray-400 flex justify-center items-center w-10  text-white disabled:bg-green-100"
                            >
                                <MdSend size={"1.5rem"} />
                            </button>
                        </div>
                    </form>
                )
            ) : (
                ""
            )}
        </div>
    );
}
