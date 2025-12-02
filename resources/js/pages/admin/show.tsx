import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// 1. Import CKEditor React Wrapper
import { CKEditor } from '@ckeditor/ckeditor5-react';

// 2. Import the Core Editor + The specific Plugins you want
import {
    ClassicEditor,
    Bold,
    Essentials,
    Italic,
    Paragraph,
    Undo,
    Heading,
    Link,
    List,
    BlockQuote
} from 'ckeditor5';

// 3. Import the CSS for the editor
import 'ckeditor5/ckeditor5.css';

interface Ticket {
    id: number;
    customer_name: string;
    email: string;
    type: string;
    description: string;
    admin_note: string | null;
    status: string;
    source_database: string;
    created_at: string;
}

interface Props {
    ticket: Ticket;
    db: string;
}

export default function Show({ ticket, db }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: `Ticket #${ticket.id}`, href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        source_database: db,
        admin_note: ticket.admin_note || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/tickets/${ticket.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Ticket #${ticket.id}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">

                {/* --- HEADER --- */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {ticket.type}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Filed by {ticket.customer_name} ({ticket.email})
                        </p>
                    </div>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        {db.toUpperCase()} DATABASE
                    </span>
                </div>

                {/* --- TICKET DETAILS --- */}
                <div className="bg-white dark:bg-sidebar-accent rounded-xl border border-sidebar-border/70 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Issue Description
                    </h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {ticket.description}
                    </div>
                </div>

                {/* --- ADMIN RESPONSE FORM --- */}
                <div className="bg-white dark:bg-sidebar-accent rounded-xl border border-sidebar-border/70 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Admin Response
                    </h3>

                    <form onSubmit={submit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Resolution Notes
                            </label>

                            <div className="ck-content-wrapper text-black">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={data.admin_note}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setData('admin_note', data);
                                    }}
                                    config={{
                                        licenseKey: 'GPL', // Required for v42+
                                        // 4. We explicitly load the plugins here
                                        plugins: [
                                            Essentials, Paragraph, Bold, Italic,
                                            Heading, Link, List, BlockQuote, Undo
                                        ],
                                        // 5. Now we can safely use them in the toolbar
                                        toolbar: [
                                            'heading', '|', 'bold', 'italic', 'link',
                                            'bulletedList', 'numberedList', 'blockQuote',
                                            '|', 'undo', 'redo'
                                        ],
                                        placeholder: "Type your resolution notes here..."
                                    }}
                                />
                            </div>

                            {errors.admin_note && (
                                <div className="text-red-500 text-sm mt-1">{errors.admin_note}</div>
                            )}
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Mark as Noted'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                /* Fix CKEditor height */
                .ck-editor__editable_inline {
                    min-height: 200px;
                }
                /* Ensure text is black inside the editor even in dark mode */
                .ck-content-wrapper {
                    --ck-color-base-background: white;
                    --ck-color-base-text: black;
                }
            `}</style>
        </AppLayout>
    );
}
