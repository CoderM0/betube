import { useForm, usePage } from "@inertiajs/react";
import { MdSend } from "react-icons/md";
import { TbLoader } from "react-icons/tb";
import CommentItem from "./CommentItem";

export default function CommentsSection({ comments, vid_id }) {
    function buildCommentTree(comments) {
        const commentMap = {};
        const commentTree = [];

        comments.forEach((comment) => {
            comment.replies = [];
            commentMap[comment.id] = comment;
        });

        comments.forEach((comment) => {
            if (comment.parent_comment_id == null) {
                commentTree.push(comment);
            } else if (commentMap[comment.parent_comment_id]) {
                commentMap[comment.parent_comment_id].replies.push(comment);
            }
        });

        return commentTree;
    }

    const user = usePage().props.auth.user;
    const { post, setData, processing, reset, data } = useForm({
        comment_text: "",
    });

    const add_comment = (e) => {
        e.preventDefault();
        post(route("user.comment.add", vid_id), {
            onSuccess: reset(),
            preserveScroll: true,
            preserveState: true,
        });
    };
    const commentTree = buildCommentTree(comments);

    return (
        <div>
            {processing ? (
                <p className="flex items-center justify-center">
                    <TbLoader
                        color="green"
                        size={"1.5rem"}
                        className="animate-spin"
                    />
                </p>
            ) : (
                <form onSubmit={add_comment}>
                    <div className="flex items-center">
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
                            placeholder="add a comment.."
                            className="w-full border focus:border-transparent border-transparent focus:ring-transparent focus:border-b-black border-b-gray-500 focus:ring-0"
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="block w-20 p-1 rounded-xl  text-green-500 disabled:bg-green-100"
                        >
                            <MdSend size={"1.5rem"} />
                        </button>
                    </div>
                </form>
            )}

            <div className="py-2 my-10">
                {commentTree.map((comment) => {
                    return (
                        <div key={comment.id} className="my-5">
                            <CommentItem key={comment.id} comment={comment} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
