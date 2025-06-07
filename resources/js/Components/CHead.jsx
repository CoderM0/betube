import { Head } from "@inertiajs/react";

export default function CHead({ title }) {
    return (
        <Head title={title}>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </Head>
    );
}
