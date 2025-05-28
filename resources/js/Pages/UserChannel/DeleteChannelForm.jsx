import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
export default function DeleteChannelForm({ channel, className }) {
    const [confirmingChannelDeletion, setConfirmingChannelDeletion] =
        useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmChannelDeletion = () => {
        setConfirmingChannelDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("channel.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingChannelDeletion(false);
        clearErrors();
        reset();
    };
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Delete {channel.channel_name} Channel
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your channel is deleted, all of its resources and data
                    will be permanently deleted.
                </p>
            </header>

            <DangerButton onClick={confirmChannelDeletion}>
                Delete Channel
            </DangerButton>

            <Modal show={confirmingChannelDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your Channel?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your channel is deleted, all of its resources and
                        data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Cahnnel
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
